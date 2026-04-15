'use client';

import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  status: 'IN_STOCK' | 'NEW_ARRIVAL' | 'LIMITED';
  alt: string;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={() => console.log(`Added ${product.name} to cart`)}
        />
      ))}
    </div>
  );
}
