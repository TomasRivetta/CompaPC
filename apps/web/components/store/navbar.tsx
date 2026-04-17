"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { categories, products } from "@/data/store-data";

export function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim().toLowerCase();

    if (!value) {
      router.push("/");
      return;
    }

    const category =
      categories.find((item) => item.name.toLowerCase().includes(value)) ??
      products.find(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.brand.toLowerCase().includes(value)
      )?.category;

    const slug = typeof category === "string" ? category : category?.slug;
    router.push(slug ? `/categoria/${slug}` : "/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-standard flex h-20 items-center gap-12">
        <div className="flex shrink-0 items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 font-headline text-2xl font-bold tracking-tight text-slate-900 transition-colors hover:text-blue-600"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">devices</span>
            </div>
            <span className="hidden sm:inline">CompaPC</span>
          </Link>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="group flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 shadow-sm"
        >
          <span className="material-symbols-outlined text-lg text-slate-400 group-focus-within:text-blue-600 transition-colors">
            search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="ml-4 h-12 w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Buscar componentes, marcas o categorías..."
            type="text"
          />
        </form>
      </div>
    </header>
  );
}
