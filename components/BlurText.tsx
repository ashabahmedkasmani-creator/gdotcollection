"use client";
import { useEffect, useRef } from "react";

// Word-by-word blur-to-sharp reveal. Use for short display headings only.
export default function BlurText({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "h3" | "p" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`blurw ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => <span key={i} aria-hidden="true" style={{ transitionDelay: `${i * 80}ms` }}>{w}&nbsp;</span>)}
    </Tag>
  );
}
