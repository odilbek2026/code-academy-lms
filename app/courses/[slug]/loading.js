export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-24 rounded-full bg-surface-2" />
        <div className="h-8 w-2/3 rounded-full bg-surface-2" />
        <div className="h-4 w-full max-w-lg rounded-full bg-surface-2" />
        <div className="grid gap-8 pt-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-surface-2" />
            ))}
          </div>
          <div className="aspect-video rounded-2xl bg-surface-2" />
        </div>
      </div>
    </div>
  );
}
