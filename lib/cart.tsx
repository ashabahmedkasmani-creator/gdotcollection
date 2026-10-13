"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartLine = { id: number; slug: string; name: string; price: number; image: string; qty: number };
type Ctx = {
  lines: CartLine[]; count: number; total: number; ready: boolean;
  add: (l: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "gcollection-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setLines(JSON.parse(s)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  const add = useCallback((l: Omit<CartLine, "qty">, qty = 1) =>
    setLines((cur) => cur.some((x) => x.id === l.id)
      ? cur.map((x) => (x.id === l.id ? { ...x, qty: x.qty + qty } : x))
      : [...cur, { ...l, qty }]), []);
  const setQty = useCallback((id: number, qty: number) =>
    setLines((cur) => cur.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x))), []);
  const remove = useCallback((id: number) => setLines((cur) => cur.filter((x) => x.id !== id)), []);

  const value = useMemo(() => ({
    lines, ready, add, setQty, remove,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((n, l) => n + l.qty * l.price, 0),
  }), [lines, ready, add, setQty, remove]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
