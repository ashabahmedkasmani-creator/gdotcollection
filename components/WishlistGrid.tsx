"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/lib/products";

export default function WishlistGrid({ products }: { products: Product[] }) {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));
  if (items.length === 0) return <div className="mt-12"><p className="text-stone">Nothing saved yet. Tap the heart on any piece to keep it here.</p><Link href="/shop" className="btn-solid mt-6">Browse the shop</Link></div>;
  return <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
