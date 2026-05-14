// Archivo para manejar el almacenamiento de cotizaciones
export type SavedQuote = {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pendiente' | 'aprobada' | 'rechazada' | 'enviada';
};

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

// Guardar una cotización
export function saveQuote(quote: Omit<SavedQuote, 'id' | 'date' | 'status'>) {
  const quotes = getQuotes();
  const newQuote: SavedQuote = {
    ...quote,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    status: 'pendiente'
  };
  quotes.push(newQuote);
  localStorage.setItem('rokkotizaciones', JSON.stringify(quotes));
  return newQuote;
}

// Obtener todas las cotizaciones
export function getQuotes(): SavedQuote[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('rokkotizaciones');
  return stored ? JSON.parse(stored) : [];
}

// Actualizar estado de una cotización
export function updateQuoteStatus(id: string, status: SavedQuote['status']) {
  const quotes = getQuotes();
  const index = quotes.findIndex(q => q.id === id);
  if (index !== -1) {
    quotes[index].status = status;
    localStorage.setItem('rokkotizaciones', JSON.stringify(quotes));
  }
}

// Eliminar una cotización
export function deleteQuote(id: string) {
  const quotes = getQuotes();
  const filtered = quotes.filter(q => q.id !== id);
  localStorage.setItem('rokkotizaciones', JSON.stringify(filtered));
}