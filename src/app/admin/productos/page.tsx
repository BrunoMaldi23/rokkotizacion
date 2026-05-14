'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminProductos() {
  const [products] = useState([
    { id: 1, name: 'Polera Manga Corta', category: 'Poleras', price: 5500, stock: 100 },
    { id: 2, name: 'Polerón Canguro', category: 'Polerones', price: 12500, stock: 50 },
    { id: 3, name: 'Softshell Premium', category: 'Parkas', price: 22000, stock: 30 },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Productos</h1>
        <button className="bg-[#00bcd4] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#00a8c4] transition-all">
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price.toLocaleString('es-CL')}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-500"><Edit size={16} /></button>
                    <button className="text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}