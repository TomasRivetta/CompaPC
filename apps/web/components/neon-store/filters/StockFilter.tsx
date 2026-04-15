'use client';

interface StockFilterProps {
  inStock: boolean;
  onStockChange: (value: boolean) => void;
}

export function StockFilter({ inStock, onStockChange }: StockFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/40 uppercase tracking-widest block">
          En Stock
        </span>
        <button
          onClick={() => onStockChange(!inStock)}
          className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
            inStock ? 'bg-primary/60' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute w-3 h-3 bg-primary rounded-full transition-all ${
              inStock ? 'right-0.5 top-0.5' : 'left-0.5 top-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
