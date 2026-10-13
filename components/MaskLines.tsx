"use client";
import { useEffect, useRef } from "react";

// Headline whose lines slide up out of a mask when scrolled into view.
export default function MaskLines({ lines, className = "", as: Tag = "h2" }: { lines: string[]; className?: string; as?: "h1" | "h2" | "h3" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`mask ${className}`}>
      {lines.map((l, i) => <span key={l} className="mask-line"><span style={{ transitionDelay: `${i * 110}ms` }}>{l}</span></span>)}
    </Tag>
  );
}
