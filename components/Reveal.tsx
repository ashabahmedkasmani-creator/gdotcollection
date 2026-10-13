"use client";
import { ReactNode, useEffect, useRef } from "react";

// variant "fade" = rise + fade; "clip" = masked image reveal (use for photography wrappers).
export default function Reveal({ children, className = "", delay = 0, variant = "fade" }: { children: ReactNode; className?: string; delay?: number; variant?: "fade" | "clip" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${variant === "clip" ? "clipr" : "reveal"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
