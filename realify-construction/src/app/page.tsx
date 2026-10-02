import { site } from "@/data/site";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import Logo from "@/components/Logo";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

const fill = (s: string) => s.replace("{founder}", site.intro.founder).replace("{years}", site.intro.years);
const waLink = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        {/* 1 · HERO */}
        <section id="top" className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-charcoal text-white">
          <div className="hero-zoom absolute inset-0">
            <Photo src={site.hero.image} alt={site.hero.imageAlt} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
          <div className="container-x relative pb-16 md:pb-24">
            <p className="hero-in eyebrow !text-white/80" style={{ animationDelay: "200ms" }}>{site.hero.eyebrow}</p>
            <h1 className="hero-in h-display mt-6 max-w-5xl whitespace-pre-line" style={{ animationDelay: "350ms" }}>
              {site.hero.title}
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lg text-white/85" style={{ animationDelay: "550ms" }}>{site.hero.subheading}</p>
            <div className="hero-in mt-10 flex flex-wrap gap-4" style={{ animationDelay: "750ms" }}>
              <a href="#projects" className="btn bg-white text-charcoal hover:bg-sand">Explore Projects</a>
              <a href="#contact" className="btn-ghost-light">Request a Quote</a>
            </div>
          </div>
          <a href="#about" aria-label="Scroll to introduction" className="absolute bottom-8 right-6 hidden h-16 w-px overflow-hidden bg-white/30 md:block lg:right-14">
            <span className="block h-1/2 w-full animate-pulse bg-white" />
          </a>
        </section>

        {/* 2 · INTRODUCTION */}
        <section id="about" className="section">
          <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{site.intro.eyebrow}</p>
              <h2 className="h-section mt-6">{site.intro.heading}</h2>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-14" delay={150}>
              {site.intro.paragraphs.map((p, i) => (
                <p key={i} className="body-lg mb-6">{fill(p)}</p>
              ))}
              <dl className="mt-12 grid gap-8 border-t border-charcoal/15 pt-10 sm:grid-cols-3">
                {site.intro.values.map((v) => (
                  <div key={v.title}>
                    <dt className="font-serif text-2xl">{v.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-charcoal/70">{v.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 3 · SERVICES */}
        <section id="services" className="section bg-sand/60">
          <div className="container-x">
            <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Services</p>
                <h2 className="h-section mt-6 max-w-2xl">What we build, and how we care for it.</h2>
              </div>
              <a href="#contact" className="link-line self-start md:self-auto">Request a Quote →</a>
            </Reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 120}>
                  <article className="group relative aspect-[4/5] overflow-hidden bg-stone" tabIndex={0}>
                    <Photo src={s.image} alt={s.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="zoom-img object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black/85" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <span className="text-[11px] tracking-[0.2em] text-white/70">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 font-serif text-3xl">{s.title}</h3>
                      <div className="grid grid-rows-[0fr] transition-all duration-700 ease-soft group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                        <p className="overflow-hidden pt-3 text-[15px] leading-relaxed text-white/85">{s.text}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 · FEATURED PROJECT */}
        <section className="section" aria-labelledby="featured-title">
          <div className="container-x">
            <Reveal>
              <a href={site.featured.link} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-[16/9]">
                  <Photo src={site.featured.image} alt={site.featured.alt} fill sizes="100vw" className="zoom-img object-cover" />
                </div>
              </a>
            </Reveal>
            <div className="mt-12 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="eyebrow">{site.featured.eyebrow}</p>
                <h2 id="featured-title" className="h-section mt-6">{site.featured.name}</h2>
                <dl className="mt-10 space-y-4 border-t border-charcoal/15 pt-8 text-sm">
                  {[["Location", site.featured.location], ["Scope", site.featured.scope], ["Completed", site.featured.year]].map(([k, v]) => (
                    <div key={k} className="flex gap-6">
                      <dt className="w-28 shrink-0 uppercase tracking-[0.2em] text-[11px] text-stone-dark pt-0.5">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={150}>
                <p className="body-lg">{site.featured.text}</p>
                <a href={site.featured.link} className="link-line mt-8">View Project →</a>
                <div className="group relative mt-12 aspect-[3/2] overflow-hidden bg-sand">
                  <Photo src={site.featured.detailImage} alt={site.featured.detailAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="zoom-img object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5 · PROCESS */}
        <section className="section bg-charcoal text-ivory" aria-labelledby="process-title">
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow !text-stone">{site.process.eyebrow}</p>
              <h2 id="process-title" className="h-section mt-6">{site.process.heading}</h2>
              <p className="mt-8 text-[17px] leading-[1.8] text-ivory/75">{site.process.intro}</p>
              <div className="group relative mt-12 aspect-[4/5] overflow-hidden bg-stone-dark">
                <Photo src={site.process.image} alt={site.process.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="zoom-img object-cover" />
              </div>
            </Reveal>
            <ol className="lg:col-span-6 lg:col-start-7 lg:pt-24">
              {site.process.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 120} className="border-t border-ivory/15 py-10 last:border-b">
                  <div className="flex gap-8">
                    <span className="font-serif text-2xl italic text-stone">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl">{s.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-ivory/70">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 · PORTFOLIO */}
        <section id="projects" className="section">
          <div className="container-x">
            <Reveal className="mb-12">
              <p className="eyebrow">{site.portfolio.eyebrow}</p>
              <h2 className="h-section mt-6">{site.portfolio.heading}</h2>
            </Reveal>
            <Reveal delay={100}>
              <Portfolio />
            </Reveal>
          </div>
        </section>

        {/* 7 · REALIFY INVESTMENTS */}
        <section id="invest" className="relative bg-sand">
          <div className="grid lg:grid-cols-2">
            <div className="group relative min-h-[420px] overflow-hidden lg:min-h-full">
              <Photo src={site.invest.image} alt={site.invest.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="zoom-img object-cover" />
            </div>
            <div className="px-5 py-24 sm:px-8 md:py-32 lg:px-20">
              <Reveal>
                <p className="eyebrow">{site.invest.eyebrow}</p>
                <h2 className="h-section mt-6">{site.invest.heading}</h2>
                <p className="body-lg mt-8 max-w-xl">{site.invest.text}</p>
              </Reveal>
              <ul className="mt-12 space-y-8">
                {site.invest.points.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 120} className="border-t border-charcoal/15 pt-6">
                    <h3 className="font-serif text-2xl">{p.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-charcoal/70">{p.text}</p>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={300}>
                <a href={site.invest.cta.href} className="btn-accent mt-12">{site.invest.cta.label}</a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 8 · TESTIMONIALS */}
        <section className="section" aria-labelledby="testimonials-title">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <p id="testimonials-title" className="eyebrow">Kind Words</p>
              <p className="mt-4 text-xs text-charcoal/50">Placeholder reviews — to be replaced with real client testimonials.</p>
            </Reveal>
            <Reveal className="lg:col-span-8 lg:col-start-5" delay={150}>
              <Testimonials />
            </Reveal>
          </div>
        </section>

        {/* 9 · STATS */}
        <section aria-label="Company in numbers" className="border-y border-charcoal/10 bg-ivory">
          <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 100}
                className={`flex flex-col-reverse border-charcoal/10 py-14 md:py-20 ${i % 2 ? "border-l pl-6 md:pl-10" : ""} ${i === 2 ? "lg:border-l lg:pl-10" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""}`}
              >
                <dt className="mt-3 text-[11px] uppercase tracking-[0.2em] text-stone-dark">{s.label}</dt>
                <dd className="font-serif text-5xl md:text-7xl">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* 10 · CONTACT */}
        <section id="contact" className="section">
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Contact</p>
              <h2 className="h-section mt-6">Begin a conversation.</h2>
              <p className="body-lg mt-8 max-w-md">
                Tell us about your site, your plans and your timeline. We&rsquo;ll respond with honest advice and a clear next step.
              </p>
              <address className="mt-12 space-y-6 not-italic">
                <div>
                  <p className="label">Phone</p>
                  <a href={site.contact.phoneHref} className="text-lg hover:text-accent">{site.contact.phone}</a>
                </div>
                <div>
                  <p className="label">Email</p>
                  <a href={`mailto:${site.contact.email}`} className="text-lg hover:text-accent break-all">{site.contact.email}</a>
                </div>
                <div>
                  <p className="label">Studio</p>
                  <p className="text-lg">{site.contact.address}</p>
                  <p className="mt-1 text-sm text-charcoal/60">{site.contact.hours}</p>
                </div>
              </address>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn mt-10 bg-[#1F6F4A] text-white hover:bg-[#185A3C]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.8 13.8 0 0 0 5.3 4.7c2 .8 2.7.9 3.7.8a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.2-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6a11.8 11.8 0 0 0 5.6 1.4 11.8 11.8 0 0 0 8.4-20.2z"/></svg>
                Chat on WhatsApp
              </a>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={150}>
              <h3 className="mb-10 font-serif text-3xl">Request a Quote</h3>
              <ContactForm />
            </Reveal>
          </div>
          <Reveal className="container-x mt-24">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand sm:aspect-[21/8]">
              <iframe
                title={`Map showing ${site.name} at ${site.contact.address}`}
                src={site.contact.mapEmbed}
                className="absolute inset-0 h-full w-full grayscale-[60%] sepia-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </section>
      </main>

      {/* 11 · FOOTER */}
      <footer className="bg-charcoal text-ivory">
        <div className="container-x grid gap-14 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs font-serif text-2xl italic text-ivory/80">{site.footer.tagline}</p>
            <p className="mt-6 text-sm text-ivory/60">In partnership with {site.partner}.</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow !text-stone">Explore</p>
            <ul className="mt-6 space-y-3">
              {site.nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-ivory/80 hover:text-ivory">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow !text-stone">Connect</p>
            <ul className="mt-6 space-y-3">
              {site.social.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-ivory">{s.label} ↗</a></li>
              ))}
              <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-ivory">WhatsApp ↗</a></li>
              <li><a href={site.contact.phoneHref} className="text-ivory/80 hover:text-ivory">{site.contact.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="container-x flex flex-col justify-between gap-3 border-t border-ivory/10 py-8 text-xs text-ivory/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href={site.footer.privacyHref} className="hover:text-ivory">Privacy Policy</a>
        </div>
      </footer>
    </>
  );
}
