'use client';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function PriceFilter({ priceRange, onPriceChange }: PriceFilterProps) {
  return (
    <div className="mb-8">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-4 block">Precio</span>
      <div className="h-1 bg-surface-container-highest rounded-full relative">
        <div className="absolute left-0 right-1/4 h-full bg-primary rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-primary cursor-pointer"></div>
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-primary cursor-pointer"></div>
      </div>
      <div className="flex justify-between mt-3 text-[10px] text-white/60 font-mono">
        <span>$0</span>
        <span>$2.500</span>
      </div>
    </div>
  );
}

