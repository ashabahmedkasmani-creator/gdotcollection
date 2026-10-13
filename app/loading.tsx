export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-10" aria-busy="true" aria-label="Loading">
      <div className="h-16 w-2/3 animate-pulse bg-stone/20 md:h-24" />
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">{Array.from({ length: 4 }, (_, i) => <div key={i} className="aspect-[2/3] animate-pulse bg-stone/20" />)}</div>
    </div>
  );
}
