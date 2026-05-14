'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminConfiguracion() {
  const [config, setConfig] = useState({
    companyName: 'ROKKO Uniformes',
    email: 'contacto@rokko.cl',
    phone: '+56 9 1234 5678',
    address: 'Temuco, Chile'
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              value={config.companyName}
              onChange={(e) => setConfig({...config, companyName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00bcd4]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => setConfig({...config, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00bcd4]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              value={config.phone}
              onChange={(e) => setConfig({...config, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00bcd4]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={config.address}
              onChange={(e) => setConfig({...config, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00bcd4]"
            />
          </div>
          
          <button className="bg-[#00bcd4] text-black px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#00a8c4] transition-all">
            <Save size={16} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}