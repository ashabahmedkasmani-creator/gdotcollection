"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
      <h1 className="font-display text-6xl tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-stone">Please try again.</p>
      <button type="button" onClick={reset} className="btn-solid mt-8">Try again</button>
    </div>
  );
}
