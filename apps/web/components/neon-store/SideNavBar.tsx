'use client';

import { useState } from 'react';
import { CategoryMenu } from './filters/CategoryMenu';
import { PriceFilter } from './filters/PriceFilter';
import { BrandsFilter } from './filters/BrandsFilter';
import { StockFilter } from './filters/StockFilter';
import { RatingFilter } from './filters/RatingFilter';

interface SideNavBarProps {
  onClose?: () => void;
}

export function SideNavBar({ onClose }: SideNavBarProps) {
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedBrands, setSelectedBrands] = useState(['MSI']);
  const [inStock, setInStock] = useState(true);
  const [rating, setRating] = useState(4);

  return (
    <div className="h-full flex flex-col bg-surface-container-low lg:bg-transparent">
      {/* Categories Section */}
      <div className="flex-none pb-4 lg:pb-8">
        <CategoryMenu onItemClick={onClose} />
      </div>

      {/* Filters Section with tonal transition */}
      <div className="flex-1 px-8 py-8 bg-surface-container/30 lg:bg-white/[0.02] border-t border-white/[0.03] lg:border-none">
        <h3 className="font-headline text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Filtros de Precisión
        </h3>
        
        <div className="space-y-10">
          <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} />
          <BrandsFilter selectedBrands={selectedBrands} onBrandsChange={setSelectedBrands} />
          <StockFilter inStock={inStock} onStockChange={setInStock} />
          <RatingFilter rating={rating} onRatingChange={setRating} />
        </div>

        <button className="mt-12 w-full py-3 bg-surface-container-highest hover:bg-white/10 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all">
          Restablecer Filtros
        </button>
      </div>
    </div>
  );
}
