"use client";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { upload } from "@vercel/blob/client";
import { site } from "@/data/site";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.xls,.xlsx";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "uploading" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFileError("");
    if (f && f.size > MAX_BYTES) {
      setFileError(`That file is ${(f.size / 1024 / 1024).toFixed(1)} MB. Choose one under 5 MB.`);
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(f);
  }

  function clearFile() {
    setFile(null);
    setFileError("");
    if (fileInput.current) fileInput.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("attachment");
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (data.company) return; // honeypot

    if (!site.form.endpoint) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject type: ${data.projectType}\nBudget: ${data.budget}\n\n${data.message}`;
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Quote request: ${data.projectType}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setErrorMsg("");
    try {
      let attachment = null;
      if (file) {
        setStatus("uploading");
        const safeName = file.name.replace(/[^\w.\-]+/g, "_");
        const blob = await upload(`inquiries/${safeName}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        attachment = { url: blob.url, name: file.name, size: file.size };
      }

      setStatus("sending");
      const res = await fetch(site.form.endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachment }),
      });
      if (!res.ok) throw new Error("send");
      setStatus("sent");
      form.reset();
      clearFile();
    } catch (err) {
      setErrorMsg(
        (err as Error).message === "send"
          ? "Your request didn't send. Try again, or call or WhatsApp us."
          : "The file didn't upload. Try a PDF or image under 5 MB, or send without it."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-charcoal/20 pt-10" role="status">
        <p className="font-serif text-3xl">Thank you. We&rsquo;ll be in touch soon.</p>
        <p className="mt-4 text-charcoal/70">If it&rsquo;s urgent, call or WhatsApp us on {site.contact.phone}.</p>
      </div>
    );
  }

  const busy = status === "uploading" || status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
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
        <label htmlFor="projectType" className="label">Service</label>
        <select id="projectType" name="projectType" required defaultValue="" className="field">
          <option value="" disabled>Select a service</option>
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
      <div className="sm:col-span-2">
        <label htmlFor="attachment" className="label">Plans or photos (optional)</label>
        <div className="flex flex-wrap items-center gap-4 border-b border-stone py-3">
          <input
            ref={fileInput}
            id="attachment"
            name="attachment"
            type="file"
            accept={ACCEPT}
            onChange={onFileChange}
            aria-describedby="attachment-hint"
            className="text-[15px] text-charcoal file:mr-4 file:cursor-pointer file:border file:border-charcoal file:bg-transparent file:px-4 file:py-2 file:text-sm file:text-charcoal hover:file:bg-charcoal hover:file:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          />
          {file && (
            <button type="button" onClick={clearFile} className="text-sm text-stone-dark underline underline-offset-4 hover:text-charcoal">
              Remove file
            </button>
          )}
        </div>
        <p id="attachment-hint" className="mt-2 text-sm text-stone-dark">One file up to 5 MB: PDF, image, Word or Excel.</p>
        {fileError && <p className="mt-2 text-sm text-accent-dark" role="alert">{fileError}</p>}
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={busy} className="btn-solid disabled:opacity-60">
          {status === "uploading" ? "Uploading file…" : status === "sending" ? "Sending…" : "Request a Quote"}
        </button>
        {status === "error" && <p className="text-sm text-accent-dark" role="alert">{errorMsg}</p>}
      </div>
    </form>
  );
}
