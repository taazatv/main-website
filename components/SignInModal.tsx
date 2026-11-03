"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useApp } from "./AppProvider";
import { useAuth } from "./AuthProvider";
import SignInForm from "./SignInForm";

/** Popup asked for by `askSignIn(href)`: once the reader signs in, it takes them on to `href`. */
export default function SignInModal() {
  const { lang } = useApp();
  const { signInFor, askSignIn } = useAuth();
  const router = useRouter();
  const modal = useRef<HTMLDivElement>(null);
  const close = () => askSignIn(null);
  const H = lang === "hi";

  useEffect(() => {
    if (!signInFor) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const frame = document.querySelector<HTMLElement>(".m-frame");
    const previousOverflow = document.body.style.overflow;
    if (frame) frame.inert = true;
    document.body.style.overflow = "hidden";
    modal.current?.querySelector<HTMLInputElement>("input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); askSignIn(null); }
      if (e.key !== "Tab") return;
      const items = modal.current?.querySelectorAll<HTMLElement>("input, button, a[href]");
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
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
  }, [signInFor, askSignIn]);

  if (!signInFor) return null;
  return (
    <div className="modal-bg auth-bg" onClick={close}>
      <div ref={modal} className="auth-card" role="dialog" aria-modal="true" aria-label={H ? "साइन इन करें" : "Sign in"} onClick={(e) => e.stopPropagation()}>
        <SignInForm onDone={() => { const next = signInFor; close(); router.push(next); }} />
        {/* last in the markup so the first field, not the close button, takes focus */}
        <button className="auth-x" aria-label={H ? "बंद करें" : "Close"} onClick={close}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
