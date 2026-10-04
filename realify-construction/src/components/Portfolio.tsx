"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

type Filter = (typeof site.portfolio.filters)[number];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = site.portfolio.items.filter((p) => filter === "All" || p.category === filter);
  const current = active !== null ? items[active] : null;
  const step = (d: number) => setActive((i) => (i === null ? i : (i + d + items.length) % items.length));
  const close = () => dialog.current?.close();

  // Native <dialog> gives us Escape-to-close, focus trapping and a backdrop for free.
  useEffect(() => {
    if (current && !dialog.current?.open) dialog.current?.showModal();
    if (!current) close();
  }, [current]);

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="mb-12 flex flex-wrap gap-x-8 gap-y-3">
        {site.portfolio.filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
              filter === f ? "border-b border-charcoal text-charcoal" : "border-b border-transparent text-stone-dark hover:text-charcoal"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={p.title} className={i % 3 === 1 ? "lg:mt-16" : ""}>
            <button onClick={() => setActive(i)} className="group block w-full text-left" aria-label={`View ${p.title} larger`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="zoom-img object-cover" />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <span className="eyebrow shrink-0">{p.category}</span>
              </div>
              <p className="mt-1 text-sm text-charcoal/60">{p.location}</p>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current?.title}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        className="m-0 h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-charcoal/95 p-4 open:flex sm:p-10 backdrop:bg-transparent"
      >
        {current && (
          <>
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 h-11 w-11 text-3xl font-light text-white/80 hover:text-white">×</button>
            <button onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 text-4xl font-light text-white/70 hover:text-white sm:left-6">‹</button>
            <button onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 text-4xl font-light text-white/70 hover:text-white sm:right-6">›</button>
            <figure className="w-full max-w-6xl">
              <div className="relative h-[70vh] w-full">
                <Image src={current.image} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between text-white/90">
                <span className="font-serif text-2xl">{current.title}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{current.category} · {current.location}</span>
              </figcaption>
            </figure>
          </>
        )}
      </dialog>
    </>
  );
}
