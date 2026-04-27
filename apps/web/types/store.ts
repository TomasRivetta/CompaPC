export interface Category {
  id: number;
  store: string;
  externalId: number | null;
  slug: string;
  name: string;
  icon: string;
  image?: string;
  sortOrder?: number | null;
  productCount?: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  inStock: boolean;
  image?: string;
  store?: string;
  url?: string;
}

export interface ApiOffer {
  id: number;
  store: string;
  external_id: number;
  title: string;
  normalized_title: string;
  price: number | null;
  price_list: number | null;
  stock: number;
  category: string | null;
  category_slug: string | null;
  category_name: string | null;
  category_external_id: number | null;
  marca: string | null;
  url: string;
  image: string | null;
}

export interface ApiCategory {
  id: number;
  store: string;
  external_id: number | null;
  slug: string;
  name: string;
  image: string | null;
  sort_order: number | null;
  product_count: number;
}
