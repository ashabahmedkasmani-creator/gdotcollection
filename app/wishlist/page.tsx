import type { Metadata } from "next";
import WishlistGrid from "@/components/WishlistGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default async function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10">
      <h1 className="font-display text-6xl tracking-tight md:text-8xl">Wishlist</h1>
      <WishlistGrid products={await getProducts()} />
    </div>
  );
}
