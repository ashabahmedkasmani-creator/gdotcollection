"use client";
import Image from "@/components/SafeImage";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { STORE_URL, formatPrice } from "@/lib/products";

export default function CartPage() {
  const { lines, total, ready, setQty, remove } = useCart();
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-10">
      <h1 className="font-display text-6xl tracking-tight md:text-8xl">Cart</h1>
      {!ready ? <p className="mt-12 text-stone">Loading…</p> : lines.length === 0 ? (
        <div className="mt-12"><p className="text-stone">Your cart is empty.</p><Link href="/shop" className="btn-solid mt-6">Continue shopping</Link></div>
      ) : (
        <>
          <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-4 py-6">
                <Link href={`/product/${l.slug}`} className="relative h-32 w-20 shrink-0 overflow-hidden bg-stone/20"><Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" /></Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4"><p className="text-sm">{l.name}</p><p className="text-sm">{formatPrice(l.price * l.qty)}</p></div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center border border-ink">
                      <button type="button" aria-label={`Decrease quantity of ${l.name}`} className="h-10 w-10" onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                      <span className="w-8 text-center">{l.qty}</span>
                      <button type="button" aria-label={`Increase quantity of ${l.name}`} className="h-10 w-10" onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                    </div>
                    <button type="button" className="underline underline-offset-4" onClick={() => remove(l.id)}>Remove</button>
                    <a className="underline underline-offset-4" href={`${STORE_URL}/?add-to-cart=${l.id}&quantity=${l.qty}`}>Order this on gdotcollection.com</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex justify-between text-lg"><span>Subtotal</span><span>{formatPrice(total)}</span></p>
          <p className="mt-4 text-sm text-stone">Orders are completed on the live store (Cash on Delivery or bank transfer). Use the “Order this” link on each item to add it to your cart there.</p>
        </>
      )}
    </div>
  );
}
