"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppProvider";
import type { IgReel } from "@/lib/instagram";

const embedUrl = (r: IgReel) => `https://www.instagram.com/reel/${r.shortcode}/embed/`;

/** Instagram reels in Instagram's own embed player: cards are previews, a click plays the reel in an on-page overlay. */
export default function ReelGrid({ reels, more }: { reels: IgReel[]; more: { href: string; label: string } }) {
  const { lang } = useApp();
  const H = lang === "hi";
  const [open, setOpen] = useState<IgReel | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="reel-grid">
        {reels.map((r) => (
          <div key={r.shortcode} className="reel-card">
            <iframe src={embedUrl(r)} title="Taaza TV reel preview" loading="lazy" scrolling="no" tabIndex={-1} />
            <button type="button" className="reel-open" onClick={() => setOpen(r)} aria-label={H ? "रील चलाएं" : "Play reel"} />
          </div>
        ))}
        <a href={more.href} target="_blank" rel="noopener noreferrer" className="lk reel-card ig-more">
          <span className="ig-more-ic"><IgIcon /></span>
          <span className="ig-more-t">{more.label}</span>
        </a>
      </div>

      {open && (
        <div className="vmodal-bg" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={H ? "Taaza TV रील" : "Taaza TV reel"}>
          <div className="vmodal is-reel" onClick={(e) => e.stopPropagation()}>
            <button ref={closeBtn} className="vmodal-x" onClick={() => setOpen(null)} aria-label={H ? "रील बंद करें" : "Close reel"}>✕</button>
            <iframe src={embedUrl(open)} title="Taaza TV reel" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </>
  );
}

export function IgIcon({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4a4 4 0 1 1-3.4-3.4 4 4 0 0 1 3.4 3.4z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
