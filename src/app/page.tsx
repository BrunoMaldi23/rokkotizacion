'use client';

import { useMemo, useRef, useState } from 'react';
import Header from '@/components/header';
import {
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  Layers,
  Package,
  Plus,
  Shield,
  Shirt,
  ShoppingBag,
  Sparkles,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ProductSelector from '@/components/ProductSelector';

const CYAN = '#00bcd4';

const DATA = [
  {
    id: 'poleras',
    name: 'Poleras',
    icon: Shirt,
    tagline: 'Corporativo & Casual',
    telas: ['Algodón', 'Piqué', 'Dry-Fit'],
    colores: ['Blanco', 'Negro', 'Azul Marino', 'Rojo', 'Gris'],
    bordados: ['Sin Bordado', 'Pecho Izq', 'Pecho Centro', 'Pecho Der', 'Espalda'],
    precios: {
      Algodón: 5500,
      Piqué: 7200,
      'Dry-Fit': 6500
    },
    models: [
      {
        id: 'p-corta',
        name: 'Polera Manga Corta',
        img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        desc: 'Jersey algodón premium.',
        specs: ['180 Grs', 'Costuras reforzadas']
      },
      {
        id: 'p-polo',
        name: 'Polera Polo Piqué',
        img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop',
        desc: 'Piqué corporativo premium.',
        specs: ['220 Grs', 'Cuello tejido']
      }
    ]
  },
  {
    id: 'polerones',
    name: 'Polerones',
    icon: Package,
    tagline: 'Abrigo & Estilo',
    telas: ['Franela Algodón', 'Poliéster'],
    colores: ['Negro', 'Gris Oxford', 'Azul'],
    bordados: ['Sin Bordado', 'Pecho Izq', 'Espalda Full', 'Manga'],
    precios: {
      'Franela Algodón': 12500,
      Poliéster: 9800
    },
    models: [
      {
        id: 'pol-canguro',
        name: 'Polerón Canguro',
        img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
        desc: 'Franela con capucha.',
        specs: ['300 Grs', 'Interior cardado']
      },
      {
        id: 'pol-cierre',
        name: 'Polerón con Cierre',
        img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
        desc: 'Cierre reforzado premium.',
        specs: ['300 Grs', 'Cierre YKK']
      }
    ]
  },
  {
    id: 'parkas',
    name: 'Parkas & Softshell',
    icon: Layers,
    tagline: 'Técnico & Impermeable',
    telas: ['Softshell', 'Taslan'],
    colores: ['Negro', 'Azul'],
    bordados: ['Sin Bordado', 'Pecho bordado', 'Espalda bordado'],
    precios: {
      Softshell: 22000,
      Taslan: 18500
    },
    models: [
      {
        id: 'softshell',
        name: 'Softshell Premium',
        img: 'https://images.unsplash.com/photo-1614633833026-07205c9d4793?q=80&w=1000&auto=format&fit=crop',
        desc: 'Impermeable y térmico.',
        specs: ['Micropolar', '10.000mm']
      }
    ]
  },
  {
    id: 'seguridad',
    name: 'Geólogos & Seguridad',
    icon: Shield,
    tagline: 'Alta Visibilidad',
    telas: ['Malla', 'Popelina', 'Gabardina'],
    colores: ['Naranja Flúor', 'Amarillo Flúor'],
    bordados: ['Sin Bordado', 'Pecho Logo', 'Espalda Estampado'],
    precios: {
      Malla: 8500,
      Popelina: 11000,
      Gabardina: 12500
    },
    models: [
      {
        id: 'geo-malla',
        name: 'Geólogo Malla Minero',
        img: 'https://images.unsplash.com/photo-1590402444520-21782d2946be?q=80&w=1000&auto=format&fit=crop',
        desc: 'Alta visibilidad técnica.',
        specs: ['Cinta 3M', 'Malla respirable']
      }
    ]
  }
];

type CartItem = {
  id: number;
  model: string;
  tela: string;
  quantity: number;
  price: number;
  embroidery?: string;
  color?: string;
  size?: string;
};

type Category = {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  telas: string[];
  colores: string[];
  bordados: string[];
  precios: Record<string, number>;
  models: Model[];
};

type Model = {
  id: string;
  name: string;
  img: string;
  desc: string;
  specs: string[];
};

type BackButtonProps = {
  onClick: () => void;
  label: string;
};

function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 border border-[#00bcd4] text-[#00bcd4] rounded-xl hover:bg-[#00bcd4] hover:text-black transition-all text-[10px] uppercase tracking-wide font-bold"
    >
      <ArrowLeft size={12} />
      {label}
    </button>
  );
}

export default function Home() {
  const [selectedCat, setSelectedCat] = useState<Category>(DATA[0]);
  const [selectedModel, setSelectedModel] = useState<Model>(DATA[0].models[0]);
  const [view, setView] = useState('categories');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalUnits = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cart]);

  const handleCategory = (cat: Category) => {
    setSelectedCat(cat);
    setSelectedModel(cat.models[0]);
    setView('models');
  };

  const handleModel = (model: Model) => {
    setSelectedModel(model);
    setView('detail');
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('COTIZACIÓN ROKKO', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Modelo', 'Tela', 'Cantidad', 'Precio Unit.', 'Total']],
      body: cart.map((item) => [
        item.model,
        item.tela,
        item.quantity,
        `$${item.price.toLocaleString('es-CL')}`,
        `$${(item.quantity * item.price).toLocaleString('es-CL')}`
      ])
    });
    doc.save('cotizacion.pdf');
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00bcd4] px-3 py-1 rounded-full mb-3">
              <Sparkles size={10} />
              <span className="text-[9px] uppercase tracking-wide font-bold">
                Sistema de Cotización
              </span>
            </div>
            <h1 className="font-bebas text-5xl sm:text-6xl italic tracking-tight uppercase">
              ROKKO Uniformes
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center gap-3 bg-[#00bcd4] px-4 py-3 rounded-xl text-black text-[10px] uppercase tracking-wide font-bold"
            >
              <ShoppingBag size={14} />
              <span>{totalUnits} unds.</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </button>
          )}
        </div>

        {cartOpen && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bebas text-3xl uppercase tracking-wide">Cotización</h2>
              <button onClick={() => setCartOpen(false)}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border border-gray-100 rounded-xl p-4">
                  <div>
                    <p className="font-semibold text-sm">{item.model}</p>
                    <p className="text-xs text-gray-400">
                      Tela: {item.tela} | Cant: {item.quantity}
                      {item.color && ` | Color: ${item.color}`}
                      {item.size && ` | Talla: ${item.size}`}
                      {item.embroidery && ` | Bordado: ${item.embroidery}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold">${(item.quantity * item.price).toLocaleString('es-CL')}</span>
                    <button onClick={() => setCart(cart.filter((x) => x.id !== item.id))} className="text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={generatePDF} className="mt-6 w-full bg-black text-[#00bcd4] rounded-xl py-4 text-[10px] uppercase tracking-wide font-bold flex items-center justify-center gap-2">
              <Download size={14} /> Descargar PDF
            </button>
          </div>
        )}

        {view === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DATA.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => handleCategory(cat)} className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-[#00bcd4] hover:-translate-y-1 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-[#00bcd4]/10 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-[#00bcd4]" />
                  </div>
                  <p className="text-[9px] uppercase tracking-wide text-[#00bcd4] font-bold mb-2">{cat.tagline}</p>
                  <h3 className="font-bebas text-2xl uppercase tracking-wide mb-2">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">Explorar <ChevronRight size={14} /></div>
                </button>
              );
            })}
          </div>
        )}

        {view === 'models' && (
          <div>
            <BackButton onClick={() => setView('categories')} label="Categorías" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              {selectedCat.models.map((model) => (
                <button key={model.id} onClick={() => handleModel(model)} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#00bcd4] transition-all text-left">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img src={model.img} alt={model.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{model.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{model.desc}</p>
                    <span className="text-[#00bcd4] font-bold text-sm">
                      Desde ${Math.min(...Object.values(selectedCat.precios)).toLocaleString('es-CL')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && (
          <div>
            <BackButton onClick={() => setView('models')} label="Modelos" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden relative">
                <img src={selectedModel.img} className="w-full h-full object-cover" alt={selectedModel.name} />
                {logo && <img src={logo} className="absolute top-[22%] left-[35%] w-[18%]" alt="Logo" />}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                  <button onClick={() => fileInputRef.current?.click()} className="bg-white border border-[#00bcd4] text-[#00bcd4] px-4 py-2 rounded-xl text-[10px] uppercase tracking-wide font-bold flex items-center gap-2">
                    <Upload size={12} /> Cargar Logo
                  </button>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-[#00bcd4] text-black px-3 py-1 rounded-full text-[9px] uppercase tracking-wide font-bold w-fit mb-5">
                  {selectedCat.name}
                </div>
                <h2 className="font-bebas text-5xl italic uppercase tracking-tight mb-4">{selectedModel.name}</h2>
                <p className="text-gray-500 mb-8">{selectedModel.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {selectedModel.specs.map((spec) => (
                    <div key={spec} className="border border-gray-200 rounded-xl p-4">
                      <p className="text-[9px] uppercase tracking-wide text-[#00bcd4] font-bold mb-1">Especificación</p>
                      <p className="text-sm font-semibold">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ProductSelector
              category={selectedCat}
              model={selectedModel}
              onAddToCart={(items) => {
                const newItems: CartItem[] = items.map((item, idx) => ({
                  id: Date.now() + idx,
                  model: `${selectedModel.name} - ${item.color} - ${item.size}`,
                  tela: item.fabric,
                  quantity: item.quantity,
                  price: item.unitPrice,
                  embroidery: item.embroidery,
                  color: item.color,
                  size: item.size,
                }));
                setCart([...cart, ...newItems]);
                alert(`✅ Se agregaron ${items.length} producto(s) a la cotización`);
              }}
            />
          </div>
        )}

        {cart.length > 0 && !cartOpen && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#00bcd4] rounded-2xl shadow-sm flex overflow-hidden">
            <button onClick={() => setCartOpen(true)} className="px-5 py-4 border-r border-gray-100">
              <p className="text-[9px] uppercase tracking-wide text-gray-400 font-bold">Productos</p>
              <p className="font-bold text-lg">{totalUnits}</p>
            </button>
            <button onClick={generatePDF} className="bg-[#00bcd4] text-black px-6 py-4 text-[10px] uppercase tracking-wide font-bold flex items-center gap-2">
              <FileText size={14} /> PDF
            </button>
          </div>
        )}
      </div>
    </main>
  );
}