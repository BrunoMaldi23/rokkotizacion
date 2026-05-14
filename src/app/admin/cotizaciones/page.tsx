'use client';

import { useState, useEffect } from 'react';
import { Eye, Download, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { getQuotes, updateQuoteStatus, deleteQuote, SavedQuote } from '@/lib/storage';

export default function AdminCotizaciones() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [filter, setFilter] = useState<string>('todas');

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    const allQuotes = getQuotes();
    setQuotes(allQuotes);
  };

  const filteredQuotes = quotes.filter(q => {
    if (filter === 'todas') return true;
    return q.status === filter;
  });

  const handleUpdateStatus = (id: string, status: SavedQuote['status']) => {
    updateQuoteStatus(id, status);
    loadQuotes();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta cotización?')) {
      deleteQuote(id);
      loadQuotes();
    }
  };

  const totalGeneral = filteredQuotes.reduce((sum, q) => sum + q.total, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cotizaciones</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
            <option value="rechazada">Rechazadas</option>
            <option value="enviada">Enviadas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredQuotes.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p>No hay cotizaciones {filter !== 'todas' ? `con estado "${filter}"` : ''}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Productos</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">#{quote.id.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm font-medium">{quote.clientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{quote.clientEmail}</td>
                      <td className="px-6 py-4 text-sm">{new Date(quote.date).toLocaleDateString('es-CL')}</td>
                      <td className="px-6 py-4 text-sm">
                        {quote.items.reduce((sum, item) => sum + item.quantity, 0)} unds.
                      </td>
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
                          <button 
                            onClick={() => handleDelete(quote.id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Total: {filteredQuotes.length} cotizaciones
                </span>
                <span className="text-lg font-bold text-[#00bcd4]">
                  Total General: ${totalGeneral.toLocaleString('es-CL')}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}