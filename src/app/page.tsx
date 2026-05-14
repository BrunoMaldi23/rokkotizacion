import Header from '@/components/header';
import { ShoppingBag, ChevronRight, Trash2, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Catálogo */}
        <main className="flex-1 p-8 border-r border-border1">
          <nav className="flex items-center gap-3 mb-10 text-[10px] font-bold tracking-widest">
            <div className="flex items-center gap-2 text-cian"><div className="w-6 h-6 rounded-full border-2 border-cian flex items-center justify-center">1</div> SELECCIONA PRENDA</div>
            <ChevronRight size={14} className="text-muted" />
            <div className="flex items-center gap-2 text-muted"><div className="w-6 h-6 rounded-full border-2 border-border1 flex items-center justify-center">2</div> CONFIGURA</div>
          </nav>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface2 border border-border1 rounded-xl p-4 hover:border-cian transition-all group cursor-pointer">
              <div className="h-32 bg-black/40 rounded-lg mb-4 flex items-center justify-center text-3xl">👕</div>
              <h3 className="text-sm font-bold uppercase">Polera Piqué</h3>
              <p className="text-[10px] text-cian font-black mt-2 uppercase">Ver Opciones</p>
            </div>
          </div>
        </main>

        {/* Resumen Lateral */}
        <aside className="w-full lg:w-[380px] bg-surface h-[calc(100vh-62px)] flex flex-col sticky top-[62px]">
          <div className="p-6 border-b border-border1 font-bebas text-xl tracking-wider text-cian">RESUMEN DEL PEDIDO</div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag size={40} className="text-border1 mb-4" />
            <p className="text-muted text-[10px] tracking-widest uppercase leading-loose">El resumen aparecerá aquí al agregar prendas</p>
          </div>
          <div className="p-6 border-t border-border1 space-y-3">
            <button className="w-full bg-cian text-black font-black py-4 rounded-xl text-xs tracking-widest uppercase hover:bg-cian2 flex items-center justify-center gap-2">
              <FileText size={16} /> GENERAR PDF
            </button>
            <button className="w-full border border-border1 text-muted py-3 rounded-xl text-[10px] tracking-widest uppercase hover:text-white hover:border-white flex items-center justify-center gap-2">
              <Trash2 size={14} /> LIMPIAR
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}