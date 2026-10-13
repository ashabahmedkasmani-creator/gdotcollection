"use client";
import Image from "@/components/SafeImage";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, type Product } from "@/lib/products";

// Desktop: pinned section whose track moves sideways with scroll. Mobile / reduced motion: native swipe row (see .hs in globals.css).
export default function HorizontalStory({ items }: { items: Product[] }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current, t = track.current, b = bar.current;
    if (!w || !t || !b || !window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = w.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      t.style.transform = `translate3d(${-p * Math.max(0, t.scrollWidth - window.innerWidth)}px,0,0)`;
      b.style.transform = `scaleX(${p})`;
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={wrap} className="hs bg-ivory" aria-label="The edit">
      <div className="hs-sticky">
        <div ref={track} className="hs-track will-change-transform">
          <div className="hs-intro">
            <p className="text-xs uppercase tracking-[0.3em] text-clay">The edit</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">Walk through<br />the collection</h2>
            <p className="mt-5 hidden text-xs uppercase tracking-[0.2em] text-stone md:block">Keep scrolling →</p>
          </div>
          {items.map((p, i) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="hs-card group" style={{ marginTop: i % 2 ? "6vh" : 0 }}>
              <div className="relative aspect-[2/3] overflow-hidden bg-stone/20">
                <Image src={p.image} alt={p.name} fill sizes="(min-width:768px) 28vw, 72vw" className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease)] group-hover:scale-[1.05]" />
              </div>
              <p className="mt-3 text-xs text-stone">0{i + 1}</p>
              <h3 className="line-clamp-2 text-sm">{p.name}</h3>
              <p className="text-sm text-stone">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
        <div className="mx-5 mt-8 hidden h-px bg-ink/15 md:mx-10 md:block"><div ref={bar} className="h-px origin-left bg-ink" style={{ transform: "scaleX(0)" }} /></div>
      </div>
    </section>
  );
}
