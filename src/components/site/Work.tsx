import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { CATEGORIES, PROJECTS, type CategoryId, type Project } from "@/data/site";

export function Work() {
  const [active, setActive] = useState<CategoryId>("d2c-ads");
  const [open, setOpen] = useState<Project | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const label = CATEGORIES.find((c) => c.id === active)!.label;

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
  }, [active]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const scroll = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="work" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-5xl font-bold md:text-7xl">Explore by<br />category</h2>
          <div className="hidden gap-2 md:flex">
            <CircleBtn label="Previous" onClick={() => scroll(-1)}><ArrowLeft className="h-4 w-4" /></CircleBtn>
            <CircleBtn label="Next" onClick={() => scroll(1)}><ArrowRight className="h-4 w-4" /></CircleBtn>
          </div>
        </div>

        <div role="tablist" aria-label="Project categories" className="no-scrollbar mt-12 flex gap-8 overflow-x-auto border-b border-border">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className={`relative shrink-0 pb-4 text-sm font-semibold uppercase tracking-wider transition-colors ${active === c.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.label}
              {active === c.id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-red" />}
            </button>
          ))}
        </div>

        <div ref={track} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {items.length === 0 ? (
            <div className="flex aspect-[16/7] w-full items-center justify-center border border-dashed border-border bg-offwhite text-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Placeholder</p>
                <p className="mt-2 font-display text-2xl uppercase">{label} projects coming soon</p>
              </div>
            </div>
          ) : (
            items.map((p) => (
              <button key={p.slug} onClick={() => setOpen(p)} className="group w-[80%] shrink-0 snap-start text-left sm:w-[45%] lg:w-[31%]">
                <div className="aspect-video overflow-hidden bg-muted">
                  {p.thumbnail && <img src={p.thumbnail} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground transition-colors group-hover:bg-foreground group-hover:text-background"><Play className="h-4 w-4" /></span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-4xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between"><h3 className="text-3xl font-bold">{open.title}</h3><button aria-label="Close" onClick={() => setOpen(null)}><X /></button></div>
            {open.videoUrl && <video src={open.videoUrl} controls className="mt-4 w-full" poster={open.thumbnail} />}
            <p className="mt-4 text-muted-foreground">{open.description}</p>
            <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
              {open.role && <div><dt className="text-muted-foreground">Role</dt><dd>{open.role}</dd></div>}
              {open.tools && <div><dt className="text-muted-foreground">Tools</dt><dd>{open.tools}</dd></div>}
              {open.year && <div><dt className="text-muted-foreground">Year</dt><dd>{open.year}</dd></div>}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}

function CircleBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button aria-label={label} onClick={onClick} className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-background">
      {children}
    </button>
  );
}
