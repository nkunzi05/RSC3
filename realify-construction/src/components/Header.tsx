"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import Logo from "./Logo";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-soft ${
        solid ? "bg-ivory/95 py-3 shadow-[0_1px_0_rgba(31,31,31,0.08)] backdrop-blur" : "bg-transparent py-6"
      } ${light ? "text-white" : "text-charcoal"}`}
    >
      <div className="container-x flex items-center justify-between">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-[12px] font-medium uppercase tracking-[0.2em] opacity-90 transition-opacity hover:opacity-60">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#contact" className={`hidden sm:inline-flex ${light ? "btn-ghost-light" : "btn-solid"} !px-5 !py-3`}>
            Begin a Conversation
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span className={`h-px w-7 bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-7 bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-28 text-charcoal transition-all duration-700 ease-soft lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {site.nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`border-b border-sand py-4 font-serif text-4xl transition-all duration-700 ease-soft ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#contact" onClick={() => setOpen(false)} className="btn-solid w-full">Begin a Conversation</a>
          <a href={site.contact.phoneHref} className="block text-center text-sm text-charcoal/70">{site.contact.phone}</a>
        </div>
      </div>
    </>
  );
}
