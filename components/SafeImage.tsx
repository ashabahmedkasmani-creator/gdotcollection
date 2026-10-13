"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Stage = "optimized" | "direct" | "fallback";

// next/image with a 3-step safety net: optimizer → direct browser load (bypasses optimizer / host restrictions) → branded placeholder.
// The placeholder fills the same box, so layout never collapses. Use only with `fill` inside a positioned parent.
export default function SafeImage({ alt, ...props }: ImageProps) {
  const [stage, setStage] = useState<Stage>("optimized");
  if (stage === "fallback") {
    return <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-stone/15 font-display text-4xl text-stone">G.</div>;
  }
  return (
    <Image {...props} alt={alt} unoptimized={stage === "direct"}
      onError={() => {
        if (process.env.NODE_ENV !== "production") console.warn(`[SafeImage] ${stage} failed:`, props.src);
        setStage((s) => (s === "optimized" ? "direct" : "fallback"));
      }} />
  );
}
