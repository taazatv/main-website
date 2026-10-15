"use client";

import { useEffect, useRef, useState } from "react";
import type { YtVideo } from "@/lib/youtube";

const fmtViews = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L views` : n >= 1000 ? `${(n / 1000).toFixed(1)}K views` : `${n} views`);

/** Grid of YouTube videos/shorts that play in an on-page overlay instead of leaving the site. */
export default function VideoGrid({ videos, className, itemClass, more }: { videos: YtVideo[]; className: string; itemClass: string; more?: { href: string; label: string } }) {
  const [open, setOpen] = useState<YtVideo | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [open]);

  return (
    <>
      <div className={className}>
        {videos.map((v) => (
          <button key={v.id} className={`lk ${itemClass} vbtn`} onClick={() => setOpen(v)} aria-label={`Play: ${v.title}`}>
            <div className={`ph ${v.short ? "v-short" : "v-wide"}`} style={{ backgroundImage: `url("${v.thumb}")` }}>
              <span className="v-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M8 5v14l11-7z" /></svg></span>
              {v.short && <span className="tag tag-accent">SHORTS</span>}
            </div>
            <div className="tt hv-t">{v.title}</div>
            {v.views > 0 && <div className="vw">{fmtViews(v.views)}</div>}
          </button>
        ))}
        {more && (
          <a href={more.href} target="_blank" rel="noopener noreferrer" className={`lk ${itemClass}`}>
            <div className="ph yt-more"><span className="yt-more-ic"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="currentColor" d="M10 8.5v7l6-3.5z" /></svg></span></div>
            <div className="tt hv-t">{more.label}</div>
          </a>
        )}
      </div>

      {open && (
        <div className="vmodal-bg" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className={`vmodal ${open.short ? "is-short" : ""}`} onClick={(e) => e.stopPropagation()}>
            <button ref={closeBtn} className="vmodal-x" onClick={() => setOpen(null)} aria-label="Close video">✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${open.id}?autoplay=1&playsinline=1&rel=0`}
              title={open.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            <div className="vmodal-t">{open.title}</div>
          </div>
        </div>
      )}
    </>
  );
}
