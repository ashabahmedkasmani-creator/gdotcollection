import type { Metadata } from "next";
import Image from "@/components/SafeImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { STORE_URL, formatPrice, getProduct, getProducts } from "@/lib/products";

type Props = { params: { slug: string } };
export async function generateStaticParams() { return (await getProducts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return {};
  return { title: p.name, description: `${p.name} — ${formatPrice(p.price)} at G. Collection.`, alternates: { canonical: `/product/${p.slug}` }, openGraph: { images: [p.image] } };
}

export default async function ProductPage({ params }: Props) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const related = (await getProducts()).filter((x) => x.id !== p.id && x.categories.some((c) => p.categories.includes(c))).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.image, offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price } };
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-stone hover:text-ink">← Shop</Link>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-lg overflow-hidden bg-stone/20">
          <Image src={p.image} alt={p.name} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="md:pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-stone">{p.categories.includes("unstitched") ? "Unstitched" : "Stitched"}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight md:text-6xl">{p.name}</h1>
          <p className="mt-4 text-xl">{formatPrice(p.price)}</p>
          <div className="mt-8"><AddToCart product={p} withQty /></div>
          <p className="mt-8 max-w-md text-sm text-stone">Cash on Delivery and bank transfer accepted. Free shipping on orders of Rs. 10,000 and above.</p>
          <a href={`${STORE_URL}/product/${p.slug}/`} className="mt-6 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-8">View full details on gdotcollection.com</a>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-4xl tracking-tight">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
        </section>
      )}
    </div>
  );
}
