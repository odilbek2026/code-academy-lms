export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-56 rounded-full bg-surface-2" />
        <div className="h-4 w-full max-w-md rounded-full bg-surface-2" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
