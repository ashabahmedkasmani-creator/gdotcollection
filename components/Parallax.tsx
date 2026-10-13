"use client";
import Image from "@/components/SafeImage";
import { useEffect, useRef } from "react";

// Image that drifts against scroll inside its frame. Desktop + motion-allowed only; static crop otherwise.
export default function Parallax({ src, alt, speed = 0.12, sizes, priority = false, className = "" }: { src: string; alt: string; speed?: number; sizes: string; priority?: boolean; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current, im = inner.current;
    if (!el || !im || !window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0, visible = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      im.style.transform = `translate3d(0, ${(r.top + r.height / 2 - window.innerHeight / 2) * -speed}px, 0) scale(1.18)`;
    };
    const tick = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; tick(); });
    io.observe(el);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => { io.disconnect(); window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); cancelAnimationFrame(raf); };
  }, [speed]);
  return (
    <div ref={box} className={`relative h-full w-full overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.18)" }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
