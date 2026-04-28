"use client";

import { useEffect, useMemo, useState } from "react";
import { getBrandsForProducts, getPriceBounds } from "@/lib/store-utils";
import { Category, Product } from "@/types/store";
import { ProductGrid } from "./product-grid";
import { SidebarFilters } from "./sidebar-filters";

export function CategoryCatalog({
  category,
  categories,
  products,
}: {
  category: Category;
  categories: Category[];
  products: Product[];
}) {
  const initialProducts = useMemo(
    () => products.filter((product) => product.category === category.slug),
    [products, category.slug]
  );
  const brands = useMemo(() => getBrandsForProducts(initialProducts), [initialProducts]);
  const bounds = useMemo(() => getPriceBounds(initialProducts), [initialProducts]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(bounds);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const pageSize = 8;

  useEffect(() => {
    setSelectedBrands([]);
    setPriceRange(bounds);
    setInStockOnly(false);
    setSortBy("featured");
    setQuery("");
    setPage(1);
    setFiltersOpen(false);
  }, [category.slug, bounds]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = initialProducts.filter((product) => {
      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchStock = !inStockOnly || product.inStock;

      const matchQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);

      return matchBrand && matchPrice && matchStock && matchQuery;
    });

    return [...filtered].sort((left, right) => {
      switch (sortBy) {
        case "price-low":
          return left.price - right.price;
        case "price-high":
          return right.price - left.price;
        case "brand":
          return left.brand.localeCompare(right.brand);
        default:
          return Number(right.inStock) - Number(left.inStock);
      }
    });
  }, [initialProducts, selectedBrands, priceRange, inStockOnly, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const visiblePageCount = 5;
  const paginationStart = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1)
  );
  const paginationEnd = Math.min(totalPages, paginationStart + visiblePageCount - 1);
  const visiblePages = Array.from(
    { length: paginationEnd - paginationStart + 1 },
    (_, index) => paginationStart + index
  );

  function handleToggleBrand(brand: string) {
    setPage(1);
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-10">

      {/* Main Content Layout */}
      <section className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
        <aside
          className={`fixed inset-0 z-[60] flex flex-col bg-white lg:static lg:z-0 lg:bg-transparent transition-transform duration-300 ${
            filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-6 lg:hidden">
            <h2 className="text-xl font-bold">Filtros</h2>
            <button onClick={() => setFiltersOpen(false)} className="rounded-xl bg-slate-100 p-2">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-0">
            <div className="lg:sticky lg:top-28">
              <SidebarFilters
                categories={categories}
                activeCategory={category.slug}
                onClose={() => setFiltersOpen(false)}
                brands={brands}
                selectedBrands={selectedBrands}
                onToggleBrand={handleToggleBrand}
                priceRange={priceRange}
                bounds={bounds}
                onPriceChange={(value) => {
                  setPriceRange(value);
                  setPage(1);
                }}
                inStockOnly={inStockOnly}
                onToggleStock={() => {
                  setInStockOnly((current) => !current);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </aside>

        <div className="space-y-10">
          {/* Toolbar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-4 border-b border-slate-200 pb-4 sm:flex sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">
                  {filteredProducts.length} resultados
                </span>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-700 shadow-sm lg:hidden"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  Filtros
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-[11px] sm:tracking-[0.14em]">
                  Ordenar
                </span>

                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full appearance-none border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 transition-all outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:w-auto"
                  >
                    <option value="price-low">Menor precio</option>
                    <option value="price-high">Mayor precio</option>
                    <option value="brand">Marca</option>
                  </select>

                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-slate-400">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <ProductGrid products={paginatedProducts} />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6 sm:pt-8">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
                className="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-slate-50 disabled:opacity-40 sm:h-12 sm:px-6"
              >
                Anterior
              </button>
              
              <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1">
                {paginationStart > 1 ? (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="h-11 w-11 shrink-0 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-slate-50 sm:h-12 sm:w-12"
                    >
                      1
                    </button>
                    {paginationStart > 2 ? (
                      <span className="px-1 text-sm font-bold text-slate-300">...</span>
                    ) : null}
                  </>
                ) : null}
                {visiblePages.map((item) => (
                  <button
                    key={item}
                    onClick={() => setPage(item)}
                    className={`h-11 w-11 shrink-0 rounded-2xl text-sm font-bold transition-all sm:h-12 sm:w-12 ${
                      item === currentPage
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                {paginationEnd < totalPages ? (
                  <>
                    {paginationEnd < totalPages - 1 ? (
                      <span className="px-1 text-sm font-bold text-slate-300">...</span>
                    ) : null}
                    <button
                      onClick={() => setPage(totalPages)}
                      className="h-11 w-11 shrink-0 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-slate-50 sm:h-12 sm:w-12"
                    >
                      {totalPages}
                    </button>
                  </>
                ) : null}
              </div>

              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={currentPage === totalPages}
                className="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-slate-50 disabled:opacity-40 sm:h-12 sm:px-6"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
