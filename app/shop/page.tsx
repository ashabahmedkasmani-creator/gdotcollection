import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections, getProducts, type CategorySlug } from "@/lib/products";

export const metadata: Metadata = { title: "Shop", description: "Browse stitched and unstitched ladies clothing from G. Collection.", alternates: { canonical: "/shop" } };

export default async function Shop({ searchParams }: { searchParams: { cat?: string; q?: string } }) {
  const all = await getProducts();
  const cat = collections.find((c) => c.slug === searchParams.cat)?.slug as CategorySlug | undefined;
  const q = (searchParams.q ?? "").trim().toLowerCase();
  const items = all.filter((p) => (!cat || p.categories.includes(cat)) && (!q || p.name.toLowerCase().includes(q)));
  const tab = (active: boolean) => `border-b pb-1 text-xs uppercase tracking-[0.2em] transition ${active ? "border-ink" : "border-transparent text-stone hover:text-ink"}`;
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10">
      <h1 className="font-display text-6xl tracking-tight md:text-8xl">{cat ? collections.find((c) => c.slug === cat)?.title : "Shop"}</h1>
      <form action="/shop" role="search" id="search" className="mt-8 flex max-w-md scroll-mt-28 border-b border-ink">
        {cat && <input type="hidden" name="cat" value={cat} />}
        <label htmlFor="q" className="sr-only">Search products</label>
        <input id="q" name="q" defaultValue={searchParams.q ?? ""} placeholder="Search kurti, lawn, embroidered…" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-stone" />
        <button type="submit" className="px-2 text-xs uppercase tracking-[0.2em]">Search</button>
      </form>
      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-6">
        <Link href="/shop" className={tab(!cat)}>All</Link>
        {collections.map((c) => <Link key={c.slug} href={`/shop?cat=${c.slug}`} className={tab(cat === c.slug)}>{c.title}</Link>)}
      </nav>
      {items.length === 0 ? (
        <p className="mt-16 text-stone">Nothing matched. Try a different word or category.</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
        </div>
      )}
    </div>
  );
}
