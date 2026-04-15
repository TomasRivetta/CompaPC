// Tipos compartidos para la tienda
export type ProductStatus = 'IN_STOCK' | 'NEW_ARRIVAL' | 'LIMITED';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  status: ProductStatus;
  alt: string;
  description?: string;
  specs?: Record<string, string>;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  inStock: boolean;
  rating: number;
  category?: string;
}
