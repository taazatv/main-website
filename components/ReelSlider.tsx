"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppProvider";
import ReelGrid from "./ReelGrid";
import type { IgReel } from "@/lib/instagram";

/**
 * A row of reels that slides smoothly. Arrows are needed on laptops: each reel is an Instagram iframe,
 * which takes the mouse, so the row can't be dragged. Phones swipe it, so CSS hides the arrows there.
 */
export default function ReelSlider({ reels, more }: { reels: IgReel[]; more: { href: string; label: string } }) {
  const { lang } = useApp();
  const H = lang === "hi";
  const wrap = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const row = () => wrap.current?.querySelector<HTMLElement>(".reel-grid") ?? null;

  useEffect(() => {
    const el = row();
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => { el.removeEventListener("scroll", update); resize.disconnect(); };
  }, []);

  // one screenful of whole reels at a time
  const slide = (dir: 1 | -1) => {
    const el = row();
    const card = el?.querySelector<HTMLElement>(".reel-card");
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const count = Math.max(1, Math.floor(el.clientWidth / step));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * count * step, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div ref={wrap} className="reel-slider">
      <ReelGrid reels={reels} more={more} />
      <button type="button" className="reel-arrow prev" hidden={edges.start} onClick={() => slide(-1)} aria-label={H ? "पिछली रील्स" : "Previous reels"}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className="reel-arrow next" hidden={edges.end} onClick={() => slide(1)} aria-label={H ? "अगली रील्स" : "Next reels"}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
