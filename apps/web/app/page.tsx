import { CategoryGrid } from "@/components/store/category-grid";
import { categories } from "@/data/store-data";
import { getApiHealth } from "@/lib/api";

export default async function HomePage() {
  const apiHealth = await getApiHealth();

  return (
    <section className="space-y-6">
      <div>
        <div className="space-y-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
              apiHealth.ok
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            API {apiHealth.ok ? "conectada" : "sin conexión"}
          </span>
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
