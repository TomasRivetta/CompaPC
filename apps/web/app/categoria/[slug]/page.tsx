import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/store/category-catalog";
import { getProductsByCategoryFromApi } from "@/lib/api";
import { getCategoryBySlug } from "@/lib/neon-store-utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategoryFromApi(category.slug);

  return <CategoryCatalog slug={category.slug} products={products} />;
}
