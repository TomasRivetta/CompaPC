import { CategoryGrid } from "@/components/store/category-grid";
import { categories } from "@/data/store-data";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div>
        <div>
          <h1 className="font-headline text-[2.8rem] font-bold tracking-[-0.06em] text-slate-900">
            ¿Qué estás buscando?
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Elegí una categoría para entrar al catálogo y usar filtros.
          </p>
        </div>
      </div>
      <CategoryGrid categories={categories} />
    </section>
  );
}
