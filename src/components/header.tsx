export default function Header() {
  return (
    <header className="bg-surface border-b border-border1 px-8 flex items-center justify-between h-[62px] sticky top-0 z-50">
      <div>
        <div className="font-bebas text-2xl tracking-wider leading-none uppercase">
          ROKKO<span className="text-cian ml-1">TIZACIÓN</span>
        </div>
        <div className="text-[9px] text-muted tracking-[0.2em] uppercase mt-1 font-bold">
          Vestuario Corporativo · Group Bird SA · Temuco
        </div>
      </div>
      <button className="border border-border1 text-muted py-1.5 px-4 rounded-lg text-[10px] tracking-widest uppercase hover:border-cian hover:text-cian transition-all font-bold">
        ⚙ Panel Admin
      </button>
    </header>
  );
}