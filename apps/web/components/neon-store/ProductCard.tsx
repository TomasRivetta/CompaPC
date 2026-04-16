'use client';

import { Product } from '@/types/neon-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-surface-container rounded-lg overflow-hidden flex flex-col group transition-all duration-500 neon-glow neon-glow-hover">
      <div className="relative aspect-square overflow-hidden bg-[#131313]">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={product.image}
        />
        <div className={`absolute top-4 left-4 backdrop-blur-md border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          product.status === 'IN_STOCK' 
            ? 'bg-primary/10 border-primary/20 text-primary' 
            : product.status === 'NEW_ARRIVAL'
            ? 'bg-tertiary/10 border-tertiary/20 text-tertiary'
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          {product.status === 'IN_STOCK' ? 'In Stock' : product.status.replace('_', ' ')}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] text-primary/60 uppercase font-bold tracking-widest mb-1">{product.brand}</span>
        <h3 className="text-white font-headline font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-auto mb-6">
          <span className="text-2xl font-black tracking-tighter text-white">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-white/30 line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-bold uppercase tracking-widest rounded-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          Visitar página
        </button>
      </div>
    </div>
  );
}

