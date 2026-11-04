"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useApp } from "./AppProvider";
import { STATE_HI, STATE_SLUG, type StateName } from "@/lib/data";
import { STATE_PHOTOS } from "@/lib/statePhotos";

const ORDER: StateName[] = ["West Bengal", "Bihar", "Uttar Pradesh", "Jharkhand"];

/** Landmark photo for a tile; its credit is on the About page. */
function Photo({ slug }: { slug: string }) {
  const p = STATE_PHOTOS[slug];
  return (
    <span className="pick-art" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/taaza/states/${slug}.jpg`} alt="" loading="lazy" title={`${p.place} · Photo: ${p.author}, ${p.license}, via Wikimedia Commons`} />
    </span>
  );
}

export default function StateModal() {
  const { stateModalOpen, setStateModalOpen, stateName, setStateName, lang, t } = useApp();
  const router = useRouter();
  const modal = useRef<HTMLDivElement>(null);
  const H = lang === "hi";
  const close = () => setStateModalOpen(false);

  useEffect(() => {
    if (!stateModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const frame = document.querySelector<HTMLElement>(".m-frame");
    const previousOverflow = document.body.style.overflow;
    if (frame) frame.inert = true;
    document.body.style.overflow = "hidden";
    (modal.current?.querySelector<HTMLButtonElement>("button.pick.on") ?? modal.current?.querySelector<HTMLButtonElement>("button.pick"))?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setStateModalOpen(false); }
      if (e.key !== "Tab") return;
      const buttons = modal.current?.querySelectorAll<HTMLButtonElement>("button");
      if (!buttons?.length) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (frame) frame.inert = false;
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [stateModalOpen, setStateModalOpen]);

  if (!stateModalOpen) return null;
  return (
    <div className="modal-bg auth-bg" onClick={close}>
      <div ref={modal} className="auth-card picker" role="dialog" aria-modal="true" aria-label={t.chooseState} onClick={(e) => e.stopPropagation()}>
        <h2 className="auth-title">{t.chooseState}</h2>
        <p className="auth-sub">{H ? "अपने राज्य की खबरें चुनें, या पूरे देश की खबरें पढ़ें।" : "Pick your state for local news, or read news from across India."}</p>

        <div className="picks">
          {/* all-India news: opens the National section and keeps the reader's state edition */}
          <button className="pick" onClick={() => { close(); router.push("/category/national"); }}>
            <Photo slug="national" />
            <span className="pick-nm">{H ? "देश" : "National"}</span>
            <span className="pick-sub">{H ? "पूरे भारत की खबरें" : "All-India news"}</span>
          </button>
          {ORDER.map((s) => (
            <button key={s} className={`pick ${stateName === s ? "on" : ""}`} aria-pressed={stateName === s} onClick={() => { setStateName(s); close(); }}>
              <Photo slug={STATE_SLUG[s]} />
              <span className="pick-nm">{H ? STATE_HI[s] : s}</span>
              <span className="pick-sub">{stateName === s ? (H ? "चुना हुआ" : "Selected") : (H ? "राज्य की खबरें" : "State news")}</span>
              {stateName === s && (
                <span className="pick-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
                </span>
              )}
            </button>
          ))}
        </div>

        <button className="auth-x" aria-label={H ? "बंद करें" : "Close"} onClick={close}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
