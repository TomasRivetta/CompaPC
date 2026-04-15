'use client';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function PriceFilter({ priceRange, onPriceChange }: PriceFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1]);
    onPriceChange([value, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0]);
    onPriceChange([priceRange[0], value]);
  };

  return (
    <div className="mb-8">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-4 block">
        Precio
      </span>
      <div className="h-1 bg-surface-container-highest rounded-full relative mb-4">
        <div 
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${(priceRange[0] / 2500) * 100}%`,
            right: `${100 - (priceRange[1] / 2500) * 100}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max="2500"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="absolute w-full h-1 top-0 appearance-none bg-transparent pointer-events-none z-5 cursor-pointer"
          style={{
            WebkitAppearance: 'slider-vertical',
            appearance: 'slider-vertical',
            writingMode: 'bt-lr',
          } as any}
        />
        <input
          type="range"
          min="0"
          max="2500"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-1 top-0 appearance-none bg-transparent pointer-events-none z-5 cursor-pointer"
          style={{
            WebkitAppearance: 'slider-vertical',
            appearance: 'slider-vertical',
            writingMode: 'bt-lr',
          } as any}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/60 font-mono">
        <span>${priceRange[0].toLocaleString()}</span>
        <span>${priceRange[1].toLocaleString()}</span>
      </div>
    </div>
  );
}
