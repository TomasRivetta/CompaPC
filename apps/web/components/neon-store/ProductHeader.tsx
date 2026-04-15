'use client';

interface ProductHeaderProps {
  title: string;
  resultCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function ProductHeader({
  title,
  resultCount,
  sortBy,
  onSortChange,
}: ProductHeaderProps) {
  return (
    <header className="mb-10 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic font-headline">
          {title}
        </h1>
        <p className="text-on-surface-variant text-sm font-body">
          Mostrando {resultCount} resultados de alto rendimiento
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest text-white/40 whitespace-nowrap">
          Ordenar por
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-surface-container border-none text-xs text-white rounded px-4 py-2 focus:ring-1 focus:ring-primary outline-none cursor-pointer"
        >
          <option value="newest">Más recientes</option>
          <option value="price-low">Precio: Bajo a Alto</option>
          <option value="price-high">Precio: Alto a Bajo</option>
          <option value="popular">Más populares</option>
        </select>
      </div>
    </header>
  );
}
