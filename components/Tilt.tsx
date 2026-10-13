"use client";
import { ReactNode, useRef } from "react";

// Subtle perspective tilt toward the pointer (max 5deg). Hover devices only; no-op on touch.
export default function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = () => window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div className="[perspective:1000px]"><div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`transition-transform duration-500 [transition-timing-function:var(--ease)] ${className}`}>{children}</div></div>;
}
