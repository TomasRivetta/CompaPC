import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/store/category-catalog";
import { getCategories, getProductsByCategoryFromApi } from "@/lib/api";
import { getCategoryBySlug } from "@/lib/store-utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = getCategoryBySlug(categories, slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategoryFromApi(category.slug);

  return <CategoryCatalog category={category} categories={categories} products={products} />;
}
