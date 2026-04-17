import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/store/category-catalog";
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

  return <CategoryCatalog slug={slug} />;
}
