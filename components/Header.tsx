"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { STORE_URL } from "@/lib/products";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const burger = "block h-px w-7 bg-current transition-transform duration-500 [transition-timing-function:var(--ease)]";
  const ul = "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-500 [transition-timing-function:var(--ease)] md:px-10 ${scrolled ? "liquid-glass py-3 text-ivory" : "py-5 text-white mix-blend-difference"}`}>
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight" onClick={() => setOpen(false)}>G. Collection</Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          {links.map((l) => <Link key={l.label} href={l.href} className={ul}>{l.label}</Link>)}
          <span className="h-3 w-px bg-white/40" aria-hidden="true" />
          <Link href="/shop#search" className={ul}>Search</Link>
          <a href={`${STORE_URL}/my-account/`} className={ul}>Account</a>
          <Link href="/wishlist" className={ul}>Wishlist ({ids.length})</Link>
          <Link href="/cart" className={ul}>Cart ({count})</Link>
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className="text-xs uppercase tracking-[0.2em]" onClick={() => setOpen(false)}>Cart ({count})</Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px]" onClick={() => setOpen((o) => !o)}>
            <span className={`${burger} ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`${burger} ${open ? "scale-x-0" : ""}`} />
            <span className={`${burger} ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>
      <div ref={bar} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-clay" style={{ transform: "scaleX(0)" }} />
      </header>
      <div id="mobile-menu" className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 text-ivory transition duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <nav aria-label="Mobile" className="flex flex-col gap-4">
          {links.map((l, i) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
              className={`font-display text-5xl tracking-tight transition duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}>{l.label}</Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-ivory/70">
          <Link href="/shop#search" onClick={() => setOpen(false)}>Search</Link>
          <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist ({ids.length})</Link>
          <a href={`${STORE_URL}/my-account/`}>Account</a>
        </div>
        <Link href="/shop" onClick={() => setOpen(false)} className="btn-ghost mt-8 self-start">Shop now</Link>
      </div>
    </>
  );
}
