import { categories, products } from "@/data/store-data";
import { CategorySlug } from "@/types/store";

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug) {
  return products.filter((product) => product.category === slug);
}

export function getBrandsForCategory(slug: CategorySlug) {
  return [...new Set(getProductsByCategory(slug).map((product) => product.brand))].sort();
}

export function getPriceBounds(slug: CategorySlug) {
  const items = getProductsByCategory(slug);
  if (!items.length) {
    return [0, 0] as [number, number];
  }

  const prices = items.map((item) => item.price);
  return [Math.min(...prices), Math.max(...prices)] as [number, number];
}
