'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Shirt, 
  FileText, 
  Settings, 
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/productos', icon: Shirt, label: 'Productos' },
  { path: '/admin/cotizaciones', icon: FileText, label: 'Cotizaciones' },
  { path: '/admin/configuracion', icon: Settings, label: 'Configuración' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-black text-white min-h-screen sticky top-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#00bcd4]" />
          <span className="font-bold text-lg">ROKKO Admin</span>
        </div>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? 'bg-[#00bcd4] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </nav>
    </aside>
  );
}