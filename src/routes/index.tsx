import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, Linkedin, Mail } from "lucide-react";
import handshake from "@/assets/founder-handshake.jpg";
import { Logo, Reveal } from "@/components/site/Reveal";
import { Work } from "@/components/site/Work";
import { CareerTimeline } from "@/components/site/CareerTimeline";
import { Button } from "@/components/ui/button";
import { CONTACT, SERVICES, STEPS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "1.8 — Creative Partner for Growing Brands" },
    { name: "description", content: "Abhishek Hareendran helps growing brands with creative strategy, digital ads, AI-powered video production and brand storytelling." },
    { property: "og:title", content: "1.8 — Creative Partner for Growing Brands" },
    { property: "og:description", content: "Creative strategy, scroll-stopping ads and AI-powered video production by Abhishek Hareendran." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});
const NAV = [{ label: "Work", id: "work" }, { label: "Services", id: "services" }, { label: "About", id: "about" }, { label: "Journey", id: "journey" }, { label: "Contact", id: "contact" }];
function Index() {
  return <div className="bg-background text-foreground"><Header /><main><Hero /><ServiceStrip /><HowIWork /><Work /><CareerTimeline /><ContactCTA /></main><Footer /></div>;
}
function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="site-container header-inner"><a href="#top" aria-label="1.8 home"><Logo /></a><nav aria-label="Main" className="hidden items-center gap-8 md:flex">{NAV.map((n) => <a key={n.id} href={`#${n.id}`} className="nav-link">{n.label}</a>)}</nav><div className="flex items-center gap-5"><a href="#contact" className="nav-link hidden items-center gap-2 sm:flex"><span className="red-marker" />Let’s create</a><Button variant="ghost" size="icon" className="circle-control" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="expanded-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <nav id="expanded-menu" aria-label="Expanded menu" className="site-container menu-panel">{NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}<ArrowUpRight /></a>)}</nav>}</header>;
}
function Hero() {
  return <section id="top" className="hero-section"><div className="site-container hero-inner"><div className="hero-copy animate-rise"><p className="eyebrow"><span className="eyebrow-line" />Ideas in motion</p><h1><span className="headline-underline">Creative partner</span><br />for growing brands<span className="text-brand-red">.</span></h1><p className="hero-description">From creative strategy and scroll-stopping ads to AI-powered video production, I help brands turn ideas into content that connects, engages, and drives growth.</p><Button asChild variant="ghost" className="arrow-link"><a href="#contact"><span className="circle-control"><ArrowRight /></span>Let’s create</a></Button></div><div className="hero-art"><img src={handshake} alt="Illustration of Abhishek Hareendran in a light business suit shaking hands with a client" width={928} height={1152} fetchPriority="high" /><span className="hero-art-edge" aria-hidden="true" /></div></div></section>;
}
function ServiceStrip() { return <section id="services" aria-label="Services" className="service-strip"><div className="site-container no-scrollbar service-inner">{SERVICES.map((service) => <p key={service}>{service}</p>)}</div></section>; }
function HowIWork() {
  return <section id="about" className="section-space process-section"><div className="site-container process-grid"><Reveal><p className="eyebrow"><span />How I work</p><h2>Good creative<br />starts with<br />understanding<span className="text-brand-red">.</span></h2><div className="process-copy"><p>I take the time to understand your business, your product, and the people you're trying to reach. Then I develop creative ideas, explore different approaches, and test what resonates with your audience.</p><p>The goal isn't just to make more content. It's to discover what works and keep making it better.</p></div></Reveal><Reveal delay={120} className="process-steps"><ol>{STEPS.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><div className="process-line" aria-hidden="true"><span /></div></Reveal></div></section>;
}
function ContactCTA() {
  return <section id="contact" className="section-space contact-section"><div className="site-container"><Reveal><p className="eyebrow"><span />Have a challenge?</p><h2>Let’s solve something<br />together<span className="text-brand-red">.</span></h2><p className="contact-description">Have a product to launch, a campaign to improve, or an idea you’re figuring out? Tell me what you’re working on. Let’s explore the problem and see what we can create together.</p><div className="contact-actions">{CONTACT.email ? <Button asChild variant="ghost" className="arrow-link"><a href={`mailto:${CONTACT.email}`}><span className="circle-control"><ArrowUpRight /></span>Let’s talk</a></Button> : <Button disabled variant="ghost" className="arrow-link" title="Contact details are being added"><span className="circle-control"><ArrowUpRight /></span>Let’s talk</Button>}{CONTACT.linkedin && <Button asChild variant="link" className="nav-link"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn<ArrowUpRight /></a></Button>}</div></Reveal></div></section>;
}
function Footer() { return <footer className="site-footer"><div className="site-container footer-inner"><a href="#top" aria-label="1.8 home"><Logo /></a><p>© {new Date().getFullYear()} 1.8 Creative Studio. Ideas in motion.</p><div className="flex gap-6">{CONTACT.email && <a href={`mailto:${CONTACT.email}`} aria-label="Email"><Mail size={16} /></a>}{CONTACT.linkedin && <a href={CONTACT.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={16} /></a>}</div></div><div className="pb-5 text-center"><Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground">Admin Login</Link></div></footer>; }
