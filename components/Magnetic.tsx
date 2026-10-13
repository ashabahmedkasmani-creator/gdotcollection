"use client";
import { ReactNode, useRef } from "react";

// Gentle magnetic pull (max 8px) for a single primary CTA. Hover devices only.
export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ok = () => window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${((e.clientX - r.left) / r.width - 0.5) * 16}px, ${((e.clientY - r.top) / r.height - 0.5) * 12}px, 0)`;
  };
  return <span ref={ref} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className="inline-block transition-transform duration-300">{children}</span>;
}
