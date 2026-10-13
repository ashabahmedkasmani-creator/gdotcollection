"use client";
import Image from "@/components/SafeImage";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

export default function Hero({ images }: { images: string[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    // Pointer-driven horizontal drift: only on hover-capable devices without reduced-motion.
    if (!el || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (e: PointerEvent) => el.style.setProperty("--x", String(e.clientX / window.innerWidth - 0.5));
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  const d = (n: number) => ({ animationDelay: `${n}ms` });
  const depth = [-50, 30, -80];
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0 grid grid-cols-3 gap-2 px-2 pt-20 md:gap-4 md:px-6">
        {images.slice(0, 3).map((src, i) => (
          <div key={src} className="relative overflow-hidden" style={{ marginTop: i === 1 ? "6vh" : 0 }}>
            <div className="absolute -inset-x-8 inset-y-0 transition-transform duration-700 [transition-timing-function:var(--ease)]"
              style={{ transform: `translate3d(calc(var(--x, 0) * ${depth[i]}px),0,0)` }}>
              <Image src={src} alt="" fill priority={i === 1} sizes="(min-width:768px) 33vw, 40vw" className="object-cover opacity-70" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
        <p className="rise mb-4 text-xs uppercase tracking-[0.3em] text-ivory/80" style={d(200)}>Stitched &amp; unstitched ladies clothing · Karachi</p>
        <h1 className="rise font-display text-[clamp(3.4rem,14vw,13rem)] font-medium uppercase leading-[0.82] tracking-[-0.05em]" style={d(350)}>G.<br />Collection</h1>
        <div className="rise mt-8 flex flex-wrap gap-3" style={d(600)}>
          <Magnetic><Link href="/shop" className="group btn bg-ivory text-ink border-ivory hover:bg-clay hover:border-clay hover:text-ivory">Shop the collection <span aria-hidden="true" className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span></Link></Magnetic>
          <Link href="/#collections" className="btn-ghost">Explore collections</Link>
        </div>
      </div>
    </section>
  );
}
