'use client';

import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  status: 'IN_STOCK' | 'NEW_ARRIVAL' | 'LIMITED';
  alt: string;
  onAddToCart?: () => void;
}

const STATUS_CONFIG = {
  IN_STOCK: {
    label: 'IN STOCK',
    color: 'bg-primary/10 border-primary/20 text-primary',
  },
  NEW_ARRIVAL: {
    label: 'NEW ARRIVAL',
    color: 'bg-tertiary/10 border-tertiary/20 text-tertiary',
  },
  LIMITED: {
    label: 'LIMITED',
    color: 'bg-error/10 border-error/20 text-error',
  },
};

export function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  status,
  alt,
  onAddToCart,
}: ProductCardProps) {
  const statusConfig = STATUS_CONFIG[status];

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col group transition-all duration-700 hover:bg-surface-container relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
        <Image
          src={image}
          alt={alt}
          fill
          className="w-full h-full object-contain p-8 transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Badge with Glassmorphism */}
        <div
          className={`absolute top-6 left-6 backdrop-blur-xl border border-white/10 rounded-sm px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl ${statusConfig.color}`}
        >
          {statusConfig.label}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent pt-20">
          <button
            onClick={onAddToCart}
            className="w-full py-3.5 bg-primary text-on-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white hover:text-black active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(109,221,255,0.3)]"
          >
            <span className="material-symbols-outlined text-base">shopping_cart</span>
            Añadir a la Build
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">
            {brand}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`w-1 h-1 rounded-full ${s <= 4 ? 'bg-primary' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>
        
        <h3 className="text-white font-headline font-bold text-xl leading-tight mb-6 group-hover:text-primary transition-colors duration-500">
          {name}
        </h3>

        <div className="flex items-baseline gap-3 mt-auto">
          <span className="text-3xl font-black tracking-tighter text-white">
            ${price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-white/20 line-through font-medium">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      {/* Decorative scanning line on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
