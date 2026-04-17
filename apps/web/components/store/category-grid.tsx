import Link from "next/link";
import { Category } from "@/types/store";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-sm">
      <div className="grid grid-cols-2 gap-px md:grid-cols-3 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="group flex min-h-[160px] flex-col items-center justify-center gap-4 bg-white p-6 text-center transition-all hover:bg-slate-50"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <span className="material-symbols-outlined text-[36px] transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </span>
            </div>
            <span className="font-headline text-lg font-bold tracking-tight text-slate-900">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}