"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Category } from "@/types/store";

export function Navbar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim().toLowerCase();

    if (!value) {
      router.push("/");
      return;
    }

    const category = categories.find(
      (item) =>
        item.name.toLowerCase().includes(value) || item.slug.toLowerCase().includes(value)
    );
    const slug = category?.slug;
    router.push(slug ? `/categoria/${slug}` : "/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container-standard flex min-h-20 flex-col gap-2.5 py-3 sm:h-20 sm:flex-row sm:items-center sm:gap-8 sm:py-0 lg:gap-12">
        <div className="flex shrink-0 items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2 font-headline text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-blue-600 sm:text-2xl"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
              <span className="material-symbols-outlined">devices</span>
            </div>
            <span>CompaPC</span>
          </Link>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="group flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50 px-3.5 transition-all shadow-sm focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 sm:px-5"
        >
          <span className="material-symbols-outlined text-lg text-slate-400 group-focus-within:text-blue-600 transition-colors">
            search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="ml-2.5 h-10 w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 sm:ml-4 sm:h-12"
            placeholder="Buscar"
            type="text"
          />
        </form>
      </div>
    </header>
  );
}
