import type { IgReel } from "@/lib/instagram";

/** Instagram reels in Instagram's own embed player: it brings the thumbnail and plays in place. */
export default function ReelGrid({ reels, more }: { reels: IgReel[]; more: { href: string; label: string } }) {
  return (
    <div className="reel-grid">
      {reels.map((r) => (
        <div key={r.shortcode} className="reel-card">
          <iframe src={`https://www.instagram.com/reel/${r.shortcode}/embed/`} title="Taaza TV reel on Instagram" loading="lazy" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        </div>
      ))}
      <a href={more.href} target="_blank" rel="noopener noreferrer" className="lk reel-card ig-more">
        <span className="ig-more-ic"><IgIcon /></span>
        <span className="ig-more-t">{more.label}</span>
      </a>
    </div>
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
