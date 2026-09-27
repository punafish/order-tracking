export function OrderTrackingSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-5 px-5 py-8 sm:px-8 lg:px-10"
      role="status"
      aria-busy="true"
    >
      <span className="sr-only">Loading order tracking</span>
      <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-2">
        <div className="h-4 w-28 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-slate-200" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5">
            <div className="size-24 shrink-0 animate-pulse rounded-2xl bg-slate-200" />

            <div className="flex-1 space-y-3 py-1">
              <div className="h-3 w-24 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-3 w-1/2 animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
          <div className="h-24 animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5">
            <div className="h-5 w-36 animate-pulse rounded-lg bg-slate-200" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="size-8 shrink-0 animate-pulse rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-3 w-24 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="h-44 animate-pulse rounded-3xl bg-slate-900" />
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
          <div className="h-12 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-12 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    </div>
  );
}