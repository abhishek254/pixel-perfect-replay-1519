import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TIMELINE } from "@/data/site";
import { CircleBtn } from "./Work";

export function CareerTimeline() {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const scroll = (direction: number, end = false) => { const el = track.current; if (!el) return; const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"; if (end) el.scrollTo({ left: direction < 0 ? 0 : el.scrollWidth, behavior }); else el.scrollBy({ left: direction * el.clientWidth * .7, behavior }); };
  return <section id="journey" className="section-space bg-background"><div className="site-container">
    <p className="eyebrow"><span />My journey</p>
    <div className="journey-heading"><h2>A creative journey,<br />still in motion<span className="text-brand-red">.</span></h2><p>From filmmaking and motion design to AI production and creative direction, my journey has been about learning, exploring, and creating at every step.</p><div className="flex gap-3"><CircleBtn label="Previous milestones" onClick={() => scroll(-1)}><ArrowLeft /></CircleBtn><CircleBtn label="Next milestones" onClick={() => scroll(1)}><ArrowRight /></CircleBtn></div></div>
    <div ref={track} className="no-scrollbar timeline-scroll"><ol className="timeline-axis">
      {TIMELINE.map((event, i) => <li key={`${event.title}-${event.year}`} className={`timeline-event ${event.current ? "is-present" : ""}`}><span className="timeline-stem" /><span className="timeline-marker" /><p className="timeline-year">{event.year}</p>
        <Popover open={open === i} onOpenChange={(value) => setOpen(value ? i : null)}><PopoverTrigger asChild><Button variant="ghost" onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)} className="timeline-title">{event.title}</Button></PopoverTrigger><PopoverContent side="top" align="start" collisionPadding={20} className="w-64" onMouseLeave={() => setOpen(null)}><p className="text-xs text-brand-red">{event.year}</p><h3 className="mt-2 font-sans text-base font-semibold">{event.title}</h3><p className="mt-2 text-sm text-muted-foreground">{event.role}</p></PopoverContent></Popover>
        <p className="timeline-role">{event.role}</p></li>)}
    </ol></div><div className="mt-5 flex justify-between"><Button variant="link" onClick={() => scroll(-1, true)} className="px-0 text-xs"><ArrowLeft />2019</Button><Button variant="link" onClick={() => scroll(1, true)} className="px-0 text-xs">Now<ArrowRight /></Button></div>
  </div></section>;
}
