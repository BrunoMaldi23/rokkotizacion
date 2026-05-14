'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

type ProductVariant = {
  id: string;
  color: string;
  size: string;
  fabric: string;
  embroidery: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type ProductSelectorProps = {
  category: any;
  model: any;
  onAddToCart: (items: ProductVariant[]) => void;
};

const COLORS: Record<string, string[]> = {
  poleras: ['Blanco', 'Negro', 'Azul Marino', 'Rojo', 'Gris'],
  polerones: ['Negro', 'Gris Oxford', 'Azul'],
  parkas: ['Negro', 'Azul'],
  seguridad: ['Naranja Flúor', 'Amarillo Flúor'],
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const EMBROIDERY: Record<string, string[]> = {
  poleras: ['Sin Bordado', 'Pecho Izq', 'Pecho Centro', 'Pecho Der', 'Espalda'],
  polerones: ['Sin Bordado', 'Pecho Izq', 'Espalda Full', 'Manga'],
  parkas: ['Sin Bordado', 'Pecho bordado', 'Espalda bordado'],
  seguridad: ['Sin Bordado', 'Pecho Logo', 'Espalda Estampado'],
};

export default function ProductSelector({ category, model, onAddToCart }: ProductSelectorProps) {
  const categoryId = category.id;
  const colors = COLORS[categoryId as keyof typeof COLORS] || COLORS.poleras;
  const embroideryOptions = EMBROIDERY[categoryId as keyof typeof EMBROIDERY] || EMBROIDERY.poleras;

  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: Date.now().toString(),
      color: colors[0],
      size: SIZES[2],
      fabric: category.telas[0],
      embroidery: embroideryOptions[0],
      quantity: 1,
      unitPrice: category.precios[category.telas[0]],
      total: category.precios[category.telas[0]],
    },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString() + Math.random(),
        color: colors[0],
        size: SIZES[2],
        fabric: category.telas[0],
        embroidery: embroideryOptions[0],
        quantity: 1,
        unitPrice: category.precios[category.telas[0]],
        total: category.precios[category.telas[0]],
      },
    ]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(variants.map(variant => {
      if (variant.id === id) {
        const updated = { ...variant, [field]: value };
        
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        
        if (field === 'fabric') {
          updated.unitPrice = category.precios[value];
          updated.total = updated.quantity * category.precios[value];
        }
        
        return updated;
      }
      return variant;
    }));
  };

  const handleAddAllToCart = () => {
    onAddToCart(variants);
    setVariants([{
      id: Date.now().toString(),
      color: colors[0],
      size: SIZES[2],
      fabric: category.telas[0],
      embroidery: embroideryOptions[0],
      quantity: 1,
      unitPrice: category.precios[category.telas[0]],
      total: category.precios[category.telas[0]],
    }]);
  };

  const totalGeneral = variants.reduce((sum, v) => sum + v.total, 0);

  return (
    <div className="mt-10 border-t border-gray-200 pt-8">
      <h3 className="font-bebas text-2xl uppercase mb-4">Selector de Productos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-xs uppercase">Color</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">Talla</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">Tela</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">Bordado</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">Cantidad</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">P. Unitario</th>
              <th className="text-left p-3 font-semibold text-xs uppercase">Total</th>
              <th className="text-left p-3 font-semibold text-xs uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3">
                  <select
                    value={variant.color}
                    onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={variant.size}
                    onChange={(e) => updateVariant(variant.id, 'size', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                  >
                    {SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={variant.fabric}
                    onChange={(e) => updateVariant(variant.id, 'fabric', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                  >
                    {category.telas.map((tela: string) => (
                      <option key={tela} value={tela}>
                        {tela} - ${category.precios[tela].toLocaleString('es-CL')}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={variant.embroidery}
                    onChange={(e) => updateVariant(variant.id, 'embroidery', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                  >
                    {embroideryOptions.map(emb => (
                      <option key={emb} value={emb}>{emb}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={variant.quantity}
                    onChange={(e) => updateVariant(variant.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24"
                  />
                </td>
                <td className="p-3 font-medium">
                  ${variant.unitPrice.toLocaleString('es-CL')}
                </td>
                <td className="p-3 font-semibold text-[#00bcd4]">
                  ${variant.total.toLocaleString('es-CL')}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => removeVariant(variant.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={variants.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <button
          onClick={addVariant}
          className="flex items-center gap-2 px-4 py-2 border border-[#00bcd4] text-[#00bcd4] rounded-lg hover:bg-[#00bcd4] hover:text-black transition-all text-sm font-medium"
        >
          <Plus size={16} />
          Agregar otra variante
        </button>
        
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Total selección:</p>
          <p className="font-bebas text-3xl text-[#00bcd4]">
            ${totalGeneral.toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      <button
        onClick={handleAddAllToCart}
        className="w-full mt-6 bg-[#00bcd4] text-black rounded-xl py-4 text-sm uppercase tracking-wide font-bold flex items-center justify-center gap-2 hover:bg-[#00a8c4] transition-all"
      >
        <Plus size={18} />
        Agregar {variants.length} {variants.length === 1 ? 'producto' : 'productos'} a la cotización
      </button>
    </div>
  );
}