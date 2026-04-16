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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [selectedBrands, setSelectedBrands] = useState(['MSI']);
  const [inStock, setInStock] = useState(true);
  const [rating, setRating] = useState(4);

  return (
    <aside className="w-full h-full bg-[#0e0e0e] flex flex-col overflow-y-auto custom-scrollbar">
      {/* Categories Section */}
      <CategoryMenu onItemClick={onClose} />
      
      {/* Filters Section */}
      <div className="px-6 py-4 border-t border-white/5">
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#00d4ff] mb-6">FILTROS</h3>
        <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} />
        <BrandsFilter selectedBrands={selectedBrands} onBrandsChange={setSelectedBrands} />
        <StockFilter inStock={inStock} onStockChange={setInStock} />
        <RatingFilter rating={rating} onRatingChange={setRating} />
      </div>
    </aside>
  );
}

