import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-portrait.png";
import suit from "@/assets/suit-portrait.jpg";
import { Logo, Reveal } from "@/components/site/Reveal";
import { Work } from "@/components/site/Work";
import { CONTACT, STATS, TIMELINE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1.8 — AI Creative Production, Advertising & Motion Design" },
      { name: "description", content: "1.8 is a creative studio by Abhishek Hareendran combining film, AI video production, motion design and advertising." },
      { property: "og:title", content: "1.8 — Ideas in Motion" },
      { property: "og:description", content: "Storytelling × AI × Advertising × Film. Creative studio by Abhishek Hareendran." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["Work", "About", "Process", "Journey", "Contact"];
const NAV_ID: Record<string, string> = { Work: "work", About: "about", Process: "about", Journey: "journey", Contact: "contact" };

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Work />
      <Journey />
      <Contact />
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo className="text-xl" />
          <p>© {new Date().getFullYear()} 1.8 Creative Studio. Ideas in motion.</p>
        </div>
        <div className="pb-6 text-center">
          <Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground">Admin Login</Link>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top"><Logo /></a>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n} href={`#${NAV_ID[n]}`} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">{n}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest md:flex">
          <span className="h-2 w-2 rounded-full bg-brand-red" /> Let's Create
        </a>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground md:hidden">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="flex flex-col gap-4 border-t border-border bg-background px-6 py-6 md:hidden">
          {NAV.map((n) => (
            <a key={n} href={`#${NAV_ID[n]}`} onClick={() => setOpen(false)} className="font-display text-2xl uppercase">{n}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = () => setY(Math.min(window.scrollY, 900));
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <section id="top" className="relative overflow-hidden bg-offwhite pt-16">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-8 px-6 md:grid-cols-2" style={{ transform: `translateY(${-y * 0.15}px)` }}>
        <div className="animate-rise relative z-10 py-12">
          <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.3em] text-muted-foreground">Creative studio<br />for a brighter<br />tomorrow</p>
          <h1 className="mt-8 text-7xl font-bold leading-[0.9] sm:text-8xl lg:text-[9rem]">Ideas<br />in motion</h1>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em]">Storytelling × AI × Advertising × Film</p>
        </div>
        <div className="relative flex h-full items-end justify-center">
          <div className="animate-circle absolute left-1/2 top-1/2 aspect-square w-[85%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red" />
          <img src={hero} alt="Abhishek Hareendran, founder of 1.8" width={1024} height={1280} className="animate-rise relative z-10 max-h-[78svh] w-auto object-contain" style={{ animationDelay: "200ms", transform: `translateY(${y * 0.08}px)` }} />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <Reveal>
          <img src={suit} alt="Abhishek Hareendran in a suit, black and white portrait" width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <div>
          <Reveal><h2 className="text-6xl font-bold leading-[0.9] md:text-8xl">Ideas<br />that grow<br />business</h2></Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              We create high-performance content for modern brands. From scroll-stopping ads to long-form brand videos, we combine creativity, strategy, and technology to help businesses stand out and grow.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 border-t border-border">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={200 + i * 100} className={`border-b border-border py-6 ${i % 2 === 0 ? "border-r pr-6" : "pl-6"}`}>
                <p className="font-display text-4xl font-bold uppercase md:text-5xl">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="bg-offwhite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><h2 className="text-5xl font-bold md:text-7xl">A 6+ year journey</h2></Reveal>
        <div className="no-scrollbar mt-16 overflow-x-auto">
          <ol className="relative grid min-w-[760px] grid-cols-6">
            <div className="absolute inset-x-0 top-[38px] h-px bg-foreground/30" />
            {TIMELINE.map((t, i) => (
              <li key={i} className="relative pr-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.year}</p>
                <span className={`mt-4 block rounded-full ${t.current ? "h-4 w-4 -translate-y-1 bg-brand-red" : "h-2.5 w-2.5 bg-foreground"}`} />
                <p className="mt-6 text-sm font-medium">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <button disabled className="mt-12 rounded-full border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest opacity-60" title="Coming soon">View full timeline</button>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="pointer-events-none absolute -right-32 top-1/2 aspect-square w-[520px] -translate-y-1/2 rounded-full border-2 border-brand-red" />
      <div className="pointer-events-none absolute right-24 top-24 h-24 w-24 rounded-full bg-brand-red" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal><h2 className="text-6xl font-bold leading-[0.9] md:text-8xl">Have an idea?<br />Let's make it move.</h2></Reveal>
        <Reveal delay={150}><p className="mt-8 max-w-md text-lg text-muted-foreground">Have a brand, a story, or an idea worth exploring? Let's create something meaningful.</p></Reveal>
        <Reveal delay={250} className="mt-10 flex flex-wrap items-center gap-6">
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5">
            Start a project <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-sm font-medium"><Mail className="h-4 w-4" />{CONTACT.email}</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium"><Linkedin className="h-4 w-4" />LinkedIn</a>
        </Reveal>
      </div>
    </section>
  );
}
