"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/store-data";
import {
  getBrandsForCategory,
  getCategoryBySlug,
  getPriceBounds,
  getProductsByCategory,
} from "@/lib/neon-store-utils";
import { CategorySlug } from "@/types/store";
import { ProductGrid } from "./product-grid";
import { SidebarFilters } from "./sidebar-filters";

export function CategoryCatalog({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  const safeSlug = category.slug as CategorySlug;

  const initialProducts = useMemo(() => getProductsByCategory(safeSlug), [safeSlug]);
  const brands = useMemo(() => getBrandsForCategory(safeSlug), [safeSlug]);
  const bounds = useMemo(() => getPriceBounds(safeSlug), [safeSlug]);

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
  }, [safeSlug, bounds]);

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

  function handleToggleBrand(brand: string) {
    setPage(1);
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Category Header */}
      <header className="relative overflow-hidden rounded-[48px] bg-[#0c111d] px-8 py-16 text-white md:px-16 md:py-20 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        
        <div className="relative z-10">
          <nav className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Inicio</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Catálogo</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="text-blue-400">{category.name}</span>
          </nav>
          
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20 border border-white/10">
                  <span className="material-symbols-outlined text-[48px] text-white transition-transform group-hover:scale-110 duration-500">
                    {category.icon}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="font-headline text-6xl font-black tracking-tighter text-white lg:text-7xl">
                  {category.name}
                </h1>
                <p className="mt-3 text-xl text-slate-400/80 font-medium max-w-lg leading-relaxed">
                  Explorá nuestra selección de <span className="text-white underline decoration-blue-500/50 underline-offset-4">{category.name.toLowerCase()}</span> de alto rendimiento.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-white/5 blur-sm" />
                <div className="relative rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">
                  <span className="text-sm font-bold tracking-tight text-white">
                    {filteredProducts.length} <span className="text-slate-500 font-medium">unidades encontradas</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:-translate-y-0.5 active:translate-y-0 lg:hidden"
              >
                <span className="material-symbols-outlined text-lg">tune</span>
                Filtros
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <section className="grid gap-12 lg:grid-cols-[300px_1fr]">
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
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="group relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <span className="material-symbols-outlined text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  search
                </span>
              </div>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-6 text-sm font-medium transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-400 shadow-sm"
                placeholder="Buscar por nombre o marca..."
                type="text"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Ordenar por:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setPage(1);
                  }}
                  className="h-14 appearance-none rounded-2xl border border-slate-200 bg-white pl-6 pr-12 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 shadow-sm transition-all focus:ring-4 focus:ring-blue-500/5 cursor-pointer"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Menor precio</option>
                  <option value="price-high">Mayor precio</option>
                  <option value="brand">Marca</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>
          </div>

          <ProductGrid products={paginatedProducts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-slate-50 disabled:opacity-40"
              >
                Anterior
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                  <button
                    key={item}
                    onClick={() => setPage(item)}
                    className={`h-12 w-12 rounded-2xl text-sm font-bold transition-all ${
                      item === page
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-slate-50 disabled:opacity-40"
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
