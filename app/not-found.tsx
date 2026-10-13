import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
      <h1 className="font-display text-7xl tracking-tight">Page not found</h1>
      <p className="mt-4 text-stone">That page doesn’t exist, or the product has moved.</p>
      <Link href="/shop" className="btn-solid mt-8">Back to shop</Link>
    </div>
  );
}
