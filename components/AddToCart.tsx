"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCart({ product, withQty = false }: { product: Product; withQty?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const click = () => {
    add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <div className="flex flex-wrap items-center gap-3" aria-live="polite">
      {withQty && (
        <div className="flex items-center border border-ink">
          <button type="button" aria-label="Decrease quantity" className="h-12 w-12" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="w-8 text-center" aria-label="Quantity">{qty}</span>
          <button type="button" aria-label="Increase quantity" className="h-12 w-12" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
        </div>
      )}
      <button type="button" onClick={click} className={withQty ? "btn-solid" : "btn-solid w-full !py-3"}>{done ? "Added ✓" : "Add to cart"}</button>
    </div>
  );
}
