function SkeletonBlock({
  className,
}: {
  className: string;
}) {
  return <div className={`rounded-2xl bg-slate-200 loading-pulse ${className}`} />;
}

export default function CategoryLoading() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <div className="loading-slider-track h-2 w-full rounded-full bg-slate-200" />
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-56" />
          <SkeletonBlock className="h-4 w-80 max-w-full" />
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-12 w-full" />
            <SkeletonBlock className="h-12 w-full" />
            <SkeletonBlock className="h-12 w-full" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-10 w-full" />
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <SkeletonBlock className="h-4 w-28" />
            <SkeletonBlock className="h-10 w-40" />
          </div>

          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <article
                key={index}
                className="overflow-hidden border border-slate-200 bg-white shadow-sm"
              >
                <div className="space-y-5 p-5">
                  <div className="flex items-center justify-between">
                    <SkeletonBlock className="h-6 w-24 rounded-full" />
                    <SkeletonBlock className="h-6 w-20 rounded-full" />
                  </div>
                  <SkeletonBlock className="h-44 w-full rounded-3xl" />
                  <div className="space-y-3">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-6 w-full" />
                    <SkeletonBlock className="h-6 w-4/5" />
                  </div>
                  <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                    <div className="space-y-2">
                      <SkeletonBlock className="h-3 w-16" />
                      <SkeletonBlock className="h-8 w-24" />
                    </div>
                    <SkeletonBlock className="h-4 w-20" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
