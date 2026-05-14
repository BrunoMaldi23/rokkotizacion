'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, FileText, DollarSign, TrendingUp, Eye, Download, CheckCircle, XCircle } from 'lucide-react';
import { getQuotes, SavedQuote, updateQuoteStatus } from '@/lib/storage';
import Link from 'next/link';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 12,
    totalQuotes: 0,
    totalRevenue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    const allQuotes = getQuotes();
    setQuotes(allQuotes);
    
    const total = allQuotes.reduce((sum, q) => sum + q.total, 0);
    const aprobadas = allQuotes.filter(q => q.status === 'aprobada').length;
    
    setStats({
      totalProducts: 12,
      totalQuotes: allQuotes.length,
      totalRevenue: total,
      conversionRate: allQuotes.length ? Math.round((aprobadas / allQuotes.length) * 100) : 0
    });
  };

  const handleUpdateStatus = (id: string, status: SavedQuote['status']) => {
    updateQuoteStatus(id, status);
    loadQuotes();
  };

  const recentQuotes = quotes.slice(0, 5);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-[#00bcd4]" />
            <span className="text-2xl font-bold">{stats.totalProducts}</span>
          </div>
          <p className="text-gray-600 text-sm">Productos Activos</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-[#00bcd4]" />
            <span className="text-2xl font-bold">{stats.totalQuotes}</span>
          </div>
          <p className="text-gray-600 text-sm">Cotizaciones Generadas</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-[#00bcd4]" />
            <span className="text-2xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</span>
          </div>
          <p className="text-gray-600 text-sm">Ingresos Totales</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-[#00bcd4]" />
            <span className="text-2xl font-bold">{stats.conversionRate}%</span>
          </div>
          <p className="text-gray-600 text-sm">Tasa de Conversión</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Cotizaciones Recientes</h2>
          <Link href="/admin/cotizaciones" className="text-[#00bcd4] text-sm hover:underline">
            Ver todas
          </Link>
        </div>
        
        {recentQuotes.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aún no hay cotizaciones generadas</p>
            <Link href="/" className="text-[#00bcd4] text-sm hover:underline mt-2 inline-block">
              Ir a la tienda →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">#{quote.id.slice(-6)}</td>
                    <td className="px-6 py-4 text-sm">{quote.clientName}</td>
                    <td className="px-6 py-4 text-sm">{new Date(quote.date).toLocaleDateString('es-CL')}</td>
                    <td className="px-6 py-4 text-sm font-semibold">${quote.total.toLocaleString('es-CL')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        quote.status === 'aprobada' ? 'bg-green-100 text-green-700' :
                        quote.status === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                        quote.status === 'rechazada' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {quote.status === 'aprobada' ? 'Aprobada' :
                         quote.status === 'pendiente' ? 'Pendiente' :
                         quote.status === 'rechazada' ? 'Rechazada' : 'Enviada'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(quote.id, 'aprobada')}
                          className="text-green-500 hover:text-green-700"
                          title="Aprobar"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(quote.id, 'rechazada')}
                          className="text-red-500 hover:text-red-700"
                          title="Rechazar"
                        >
                          <XCircle size={16} />
                        </button>
                        <button className="text-[#00bcd4] hover:text-[#00a8c4]" title="Ver detalles">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}