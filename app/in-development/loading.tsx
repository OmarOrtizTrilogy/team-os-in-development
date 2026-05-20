export default function Loading() {
  return (
    <main className="max-w-[960px] mx-auto px-6 py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
        <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
        <div className="h-4 w-56 rounded bg-neutral-200 dark:bg-neutral-800 mb-4" />
        <div className="flex gap-3">
          {[60, 80, 160].map((w) => (
            <div
              key={w}
              className="h-3 rounded bg-neutral-200 dark:bg-neutral-800"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-2 mb-8 py-3">
        {[48, 64, 56, 48].map((w, i) => (
          <div
            key={i}
            className="h-7 rounded-md bg-neutral-200 dark:bg-neutral-800"
            style={{ width: w }}
          />
        ))}
      </div>

      {/* Product sections skeleton */}
      {[3, 2].map((count, pi) => (
        <div key={pi} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-12 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-neutral-900 p-5 h-44"
                style={{ boxShadow: "var(--shadow-card)" }}
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
