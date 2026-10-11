"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppProvider";
import { NAV, SOCIALS, STATE_HI, type NavLeaf } from "@/lib/data";

type Menu = { top: number; left: number; items: NavLeaf[] } | null;

export default function Header() {
  const { t, lang, setLang, theme, toggleTheme, stateName, setStateModalOpen } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState<Menu>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hindi = lang === "hi";

  useEffect(() => setMenu(null), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const shut = (e: Event) => {
      if (e.type === "pointerdown" && (e.target as Element).closest(".dropdown, .nav-item.group")) return;
      setMenu(null);
    };
    window.addEventListener("pointerdown", shut);
    window.addEventListener("scroll", shut, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", shut);
      window.removeEventListener("scroll", shut);
    };
  }, [menu]);

  const isOn = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const keep = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const close = () => { keep(); closeTimer.current = setTimeout(() => setMenu(null), 120); };
  const open = (el: HTMLElement, items: NavLeaf[]) => {
    keep();
    const r = el.getBoundingClientRect();
    setMenu({ top: r.bottom + 8, left: r.left, items });
  };

  return (
    <>
      {/* logo row */}
      <div className="hdr">
        <div className="hdr-left">
          <a href="#" className="chip" aria-label="Get it on Google Play">
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
          <a href="#" className="chip" aria-label="Download on the App Store">
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

        <Link href="/" aria-label="Taaza TV home" style={{ justifySelf: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="m-logo" src="/taaza/logo.png" alt="Taaza TV" />
        </Link>

        <div className="hdr-right">
          <div className="socials">
            {SOCIALS.map((so) => (
              <a key={so.name} href="#" aria-label={so.name} title={so.name} className="soc" style={{ background: so.bg }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {so.paths.map((d) => <path key={d} d={d} />)}
                </svg>
              </a>
            ))}
          </div>
          <a href="#" className="chip signin">
            <span className="chip-ic">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="chip-signin-txt">{t.signIn}</span>
          </a>
        </div>
      </div>

      {/* dark nav strip */}
      <div className="navbar">
        <nav className="navstrip">
          {NAV.map((n) =>
            "group" in n ? (
              <button
                key={n.label}
                className={`nav-item group ${n.group.some((g) => isOn(g.href)) ? "on" : ""}`}
                onMouseEnter={(e) => open(e.currentTarget, n.group)}
                onMouseLeave={close}
                onClick={(e) => (menu ? setMenu(null) : open(e.currentTarget, n.group))}
              >
                {hindi ? n.hi : n.label}
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            ) : (
              <Link key={n.label} href={n.href} className={`nav-item ${isOn(n.href) ? "on" : ""}`} onMouseEnter={close}>
                {(n.label === "Premium" || n.label === "Live TV") && <span className="nav-flag" />}
                {hindi ? n.hi : n.label}
              </Link>
            ),
          )}
        </nav>
        <span className="nav-div" />
        <div className="nav-tools">
          <div className="lang-dark">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} title="English">EN</button>
            <button className={`hi ${lang === "hi" ? "on" : ""}`} onClick={() => setLang("hi")} title="Hindi">हिं</button>
          </div>
          <button className="round-dark" onClick={toggleTheme} title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
        <button className="edition" onClick={() => { setMenu(null); setStateModalOpen(true); }} title={hindi ? STATE_HI[stateName] : stateName}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{hindi ? STATE_HI[stateName] : stateName}</span>
        </button>
      </div>

      {menu && (
        <div className="dropdown" style={{ top: menu.top, left: menu.left }} onMouseEnter={keep} onMouseLeave={close}>
          {menu.items.map((it) => (
            <a key={it.label} href={it.href} onClick={(e) => { e.preventDefault(); setMenu(null); router.push(it.href); }}>
              {hindi ? it.hi : it.label}
            </a>
          ))}
        </div>
      )}

      {/* breaking ticker */}
      <div className="ticker">
        <div className="ticker-tag">{t.breaking}</div>
        <div className="ticker-track">
          <div className="ticker-run" key={lang}>
            <span>{t.ticker}</span>
            <span aria-hidden="true">{t.ticker}</span>
          </div>
        </div>
      </div>

      {/* ad */}
      <div className="m-ad">
        <Link href="/category/medha-samman-2026">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/taaza/medha-samman-banner.jpg" alt="Check your name in the Medha Samman list" />
        </Link>
      </div>
    </>
  );
}
