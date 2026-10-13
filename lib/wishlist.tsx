"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Ctx = { ids: number[]; has: (id: number) => boolean; toggle: (id: number) => void };
const W = createContext<Ctx | null>(null);
const KEY = "gcollection-wishlist-v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setIds(JSON.parse(s)); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {} }, [ids, ready]);
  const toggle = useCallback((id: number) => setIds((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id])), []);
  const value = useMemo(() => ({ ids, toggle, has: (id: number) => ids.includes(id) }), [ids, toggle]);
  return <W.Provider value={value}>{children}</W.Provider>;
}
export function useWishlist() {
  const c = useContext(W);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
}
