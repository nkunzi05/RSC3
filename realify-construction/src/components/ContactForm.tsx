"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company) return; // honeypot

    if (site.form.endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.form.endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error();
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject type: ${data.projectType}\nBudget: ${data.budget}\n\n${data.message}`;
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Quote request — ${data.projectType}`)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border-t border-charcoal/20 pt-10" role="status">
        <p className="font-serif text-3xl">Thank you — we&rsquo;ll be in touch soon.</p>
        <p className="mt-4 text-charcoal/70">If it&rsquo;s urgent, call or WhatsApp us on {site.contact.phone}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="name" className="label">Name</label>
        <input id="name" name="name" required autoComplete="name" className="field" placeholder="Your full name" />
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="phone" className="label">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" placeholder="+263 …" />
      </div>
      <div>
        <label htmlFor="projectType" className="label">Project type</label>
        <select id="projectType" name="projectType" required defaultValue="" className="field">
          <option value="" disabled>Select a project type</option>
          {site.form.projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="budget" className="label">Budget range</label>
        <select id="budget" name="budget" defaultValue="" className="field">
          <option value="" disabled>Select a budget range</option>
          {site.form.budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" rows={4} required className="field resize-none" placeholder="Tell us a little about your project, site and timeline" />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-solid disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Request a Quote"}
        </button>
        {status === "error" && <p className="text-sm text-accent-dark" role="alert">Something went wrong — please call or WhatsApp us instead.</p>}
      </div>
    </form>
  );
}
