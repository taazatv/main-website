"use client";

import { useEffect } from "react";
import { useApp } from "./AppProvider";
import { STATE_HI, type StateName } from "@/lib/data";
import { STATE_SHAPES } from "@/lib/stateShapes";

const ORDER: StateName[] = ["West Bengal", "Bihar", "Uttar Pradesh", "Jharkhand"];

export default function StateModal() {
  const { stateModalOpen, setStateModalOpen, stateName, setStateName, lang, t } = useApp();

  useEffect(() => {
    if (!stateModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStateModalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stateModalOpen, setStateModalOpen]);

  if (!stateModalOpen) return null;
  return (
    <div className="modal-bg" onClick={() => setStateModalOpen(false)}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={t.chooseState} onClick={(e) => e.stopPropagation()}>
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
              onClick={() => { setStateName(s); setStateModalOpen(false); }}
            >
              <div className="box">
                <svg viewBox="0 0 200 200" aria-label={s}><path d={STATE_SHAPES[s]} /></svg>
              </div>
              <span className="nm">{lang === "hi" ? STATE_HI[s] : s}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
