"use client";

import { useApp } from "./AppProvider";
import { APP_LINKS } from "@/lib/links";

export default function AppLinks({ className }: { className: string }) {
  const { t } = useApp();
  return (
    <div className={className}>
      <a href={APP_LINKS.playStore} target="_blank" rel="noopener noreferrer" className="chip" aria-label="Get it on Google Play">
        <span className="chip-ic">
          <svg viewBox="0 0 512 512" width="16" height="16" aria-hidden="true">
            <path fill="#34a853" d="M325 256 92 489c-6 5-14 4-19-2l186-186z" />
            <path fill="#4285f4" d="M73 23c-6 5-9 13-9 22v422c0 9 3 17 9 22l186-211z" />
            <path fill="#fbbc04" d="M325 256l79-79 7 4c25 14 25 36 0 50l-7 4z" />
            <path fill="#ea4335" d="M325 256L259 190 73 23c5-5 14-6 21-2l311 176z" />
          </svg>
        </span>
        <span className="chip-txt">
          <span className="chip-sm">{t.getItOn}</span>
          <span className="chip-lg">Google Play</span>
        </span>
      </a>
      <a href={APP_LINKS.appStore} target="_blank" rel="noopener noreferrer" className="chip" aria-label="Download on the App Store">
        <span className="chip-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M16.4 12.7c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.5 2 1-.1 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3zM14.6 6.3c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
          </svg>
        </span>
        <span className="chip-txt">
          <span className="chip-sm">{t.downloadOnThe}</span>
          <span className="chip-lg">App Store</span>
        </span>
      </a>
    </div>
  );
}
