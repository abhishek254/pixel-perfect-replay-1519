import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORIES, PROJECTS, publicProjects, type CategoryId, type Project } from "@/data/site";

export function CircleBtn({ children, label, onClick, disabled = false }: { children: ReactNode; label: string; onClick: () => void; disabled?: boolean }) {
  return <Button variant="ghost" size="icon" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="circle-control">{children}</Button>;
}
export function Work() {
  const [active, setActive] = useState<CategoryId>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = publicProjects(PROJECTS, active);
  const label = CATEGORIES.find((c) => c.id === active)?.label ?? "All";
  useEffect(() => { track.current?.scrollTo({ left: 0 }); }, [active]);
  const scroll = (d: number) => { const el = track.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
  return (
    <section id="work" className="portfolio-section section-space">
      <div className="site-container">
        <p className="eyebrow"><span />Selected work</p>
        <div className="work-heading">
          <h2>Explore by<br />category<span className="text-brand-red">.</span></h2>
          <p>A selection of work across different formats and industries.<br className="hidden lg:block" /> Each project solves a different problem, for a different audience.</p>
          <div className="flex gap-3"><CircleBtn label="Previous projects" onClick={() => scroll(-1)} disabled={!items.length}><ArrowLeft /></CircleBtn><CircleBtn label="Next projects" onClick={() => scroll(1)} disabled={!items.length}><ArrowRight /></CircleBtn></div>
        </div>
        <div role="tablist" aria-label="Project categories" className="no-scrollbar category-bar">
          {CATEGORIES.map((c) => <Button key={c.id} variant="ghost" role="tab" aria-selected={active === c.id} aria-controls="project-panel" id={`category-${c.id}`} onClick={() => setActive(c.id)} className={`category-pill ${active === c.id ? "is-active" : ""}`}>{c.label}</Button>)}
        </div>
        <div ref={track} id="project-panel" role="tabpanel" aria-labelledby={`category-${active}`} tabIndex={0} className="no-scrollbar project-track">
          {items.length === 0 ? <div className="portfolio-empty"><span className="empty-line" /><p>{active === "all" ? "New work is on its way." : `${label} — new work is on its way.`}</p><span className="empty-line" /></div> : items.map((p) => <Button variant="ghost" key={p.slug} onClick={() => setOpen(p)} className="project-card group">
            <div className="aspect-video overflow-hidden bg-muted">{p.thumbnail && <img src={p.thumbnail} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}</div>
            <div className="project-caption"><div><p>{CATEGORIES.find((c) => c.id === p.category)?.label}</p><h3>{p.title}</h3></div><span className="circle-control"><Play /></span></div>
          </Button>)}
        </div>
      </div>
      <Dialog open={Boolean(open)} onOpenChange={(value) => { if (!value) setOpen(null); }}><DialogContent className="max-h-[90svh] max-w-4xl overflow-y-auto">
        <DialogTitle>{open?.title}</DialogTitle><DialogDescription>{open?.description}</DialogDescription>
        {open?.videoUrl && <video src={open.videoUrl} controls preload="metadata" poster={open.thumbnail} className="w-full" />}
        <dl className="grid grid-cols-3 gap-4 text-sm">{open?.role && <div><dt>Role</dt><dd>{open.role}</dd></div>}{open?.tools && <div><dt>Tools</dt><dd>{open.tools}</dd></div>}{open?.year && <div><dt>Year</dt><dd>{open.year}</dd></div>}</dl>
      </DialogContent></Dialog>
    </section>
  );
}
