"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "./AppProvider";
import { reelEmbedUrl, type IgReel } from "@/lib/instagram";

/**
 * Full-screen reel player: one reel per screen. Swipe, wheel, arrow keys and the buttons all move the same
 * snap-scrolling column, so they can't disagree about which reel is showing.
 */
export default function ReelViewer({ reels, start, onClose }: { reels: IgReel[]; start: number; onClose: () => void }) {
  const { lang } = useApp();
  const H = lang === "hi";
  const [active, setActive] = useState(start);
  // Instagram's player can't be paused from here, so a reel that was left is reloaded to stop its sound
  const [stops, setStops] = useState<Record<number, number>>({});
  const column = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const el = column.current;
    if (el) el.scrollTop = start * el.clientHeight;
  }, [start]);

  const onScroll = () => {
    const el = column.current;
    if (!el) return;
    const i = Math.min(reels.length - 1, Math.max(0, Math.round(el.scrollTop / el.clientHeight)));
    if (i === active) return;
    setStops((s) => ({ ...s, [active]: (s[active] ?? 0) + 1 }));
    setActive(i);
  };

  const go = (i: number) => {
    const el = column.current;
    if (!el || i < 0 || i >= reels.length) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: i * el.clientHeight, behavior: calm ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(active + 1); }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(active - 1); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    // clicking play moves focus into Instagram's frame, where our keys stop working: take it back
    const onBlur = () => setTimeout(() => { if (document.activeElement?.tagName === "IFRAME") closeBtn.current?.focus({ preventScroll: true }); });
    window.addEventListener("blur", onBlur);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("blur", onBlur);
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  // rendered on <body> so the page wrapper's zoom (.m-zoom) can't shrink a full-screen player
  return createPortal(
    <div className="rv" role="dialog" aria-modal="true" aria-label={H ? "Taaza TV रील्स" : "Taaza TV reels"}>
      <div ref={column} className="rv-column" onScroll={onScroll}>
        {reels.map((r, i) => (
          <div
            key={r.shortcode}
            className="rv-slide"
            // the empty space beside the reel closes it, but a stray tap on a phone shouldn't
            onClick={(e) => { if (e.target === e.currentTarget && window.matchMedia("(hover: hover)").matches) onClose(); }}
          >
            <div className="rv-frame">
              {Math.abs(i - active) <= 1 && (
                <iframe
                  key={stops[i] ?? 0}
                  src={reelEmbedUrl(r)}
                  title={H ? `Taaza TV रील ${i + 1}` : `Taaza TV reel ${i + 1}`}
                  scrolling="no"
                  tabIndex={i === active ? 0 : -1}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
              <a href={r.permalink} target="_blank" rel="noopener noreferrer" className="rv-ig" tabIndex={i === active ? 0 : -1}>
                @taazatvchannel · {H ? "Instagram पर देखें" : "View on Instagram"}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="rv-count" aria-live="polite">{active + 1} / {reels.length}</div>
      <button ref={closeBtn} type="button" className="rv-btn rv-close" onClick={onClose} aria-label={H ? "रील बंद करें" : "Close reel"}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="rv-nav">
        <button type="button" className="rv-btn" disabled={active === 0} onClick={() => go(active - 1)} aria-label={H ? "पिछली रील" : "Previous reel"}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7" /></svg>
        </button>
        <button type="button" className="rv-btn" disabled={active === reels.length - 1} onClick={() => go(active + 1)} aria-label={H ? "अगली रील" : "Next reel"}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7" /></svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
