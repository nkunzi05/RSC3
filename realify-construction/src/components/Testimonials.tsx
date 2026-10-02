"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Testimonials() {
  const list = site.testimonials;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 7000);
    return () => clearInterval(t);
  }, [paused, list.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="relative min-h-[320px] sm:min-h-[240px] lg:min-h-[210px]">
        {list.map((t, idx) => (
          <figure
            key={idx}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-all duration-1000 ease-soft ${idx === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}
          >
            <blockquote className="font-serif text-3xl italic leading-snug md:text-[2.75rem] md:leading-[1.25]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="text-charcoal/60"> — {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-6">
        <button onClick={() => setI((i - 1 + list.length) % list.length)} aria-label="Previous testimonial" className="h-11 w-11 border border-charcoal/30 text-lg transition-colors hover:bg-charcoal hover:text-ivory">←</button>
        <button onClick={() => setI((i + 1) % list.length)} aria-label="Next testimonial" className="h-11 w-11 border border-charcoal/30 text-lg transition-colors hover:bg-charcoal hover:text-ivory">→</button>
        <span className="text-[12px] tracking-[0.2em] text-stone-dark" aria-live="polite">
          {String(i + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
