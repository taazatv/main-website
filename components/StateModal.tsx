"use client";

import { useEffect, useRef } from "react";
import { useApp } from "./AppProvider";
import { STATE_HI, type StateName } from "@/lib/data";
import { STATE_SHAPES } from "@/lib/stateShapes";

const ORDER: StateName[] = ["West Bengal", "Bihar", "Uttar Pradesh", "Jharkhand"];

export default function StateModal() {
  const { stateModalOpen, setStateModalOpen, stateName, setStateName, lang, t } = useApp();
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stateModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const frame = document.querySelector<HTMLElement>(".m-frame");
    const previousOverflow = document.body.style.overflow;
    if (frame) frame.inert = true;
    document.body.style.overflow = "hidden";
    modal.current?.querySelector<HTMLButtonElement>("button")?.focus();
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
    <div className="modal-bg" onClick={() => setStateModalOpen(false)}>
      <div ref={modal} className="modal" role="dialog" aria-modal="true" aria-label={t.chooseState} onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <h3>{t.chooseState}</h3>
          <button className="modal-x" title="Close" onClick={() => setStateModalOpen(false)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="shapes">
          {ORDER.map((s) => (
            <button
              key={s}
              className={`shape ${stateName === s ? "on" : ""}`}
              aria-pressed={stateName === s}
              onClick={() => { setStateName(s); setStateModalOpen(false); }}
            >
              <div className="box">
                <svg viewBox="0 0 200 200" aria-hidden="true"><path d={STATE_SHAPES[s]} /></svg>
              </div>
              <span className="nm">{lang === "hi" ? STATE_HI[s] : s}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
