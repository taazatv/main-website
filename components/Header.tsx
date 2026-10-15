"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppProvider";
import AppLinks from "./AppLinks";
import { NAV, SOCIALS, STATE_HI, type NavLeaf } from "@/lib/data";

type Menu = { top: number; left: number; items: NavLeaf[] } | null;

const MOBILE_TOPICS = [
  { label: "Home", hi: "होम", href: "/" },
  { label: "National", hi: "देश", href: "/category/national" },
  { label: "State", hi: "राज्य", href: "/category/state" },
  { label: "Live TV", hi: "लाइव TV", href: "/live-tv" },
  { label: "Sports", hi: "खेल", href: "/category/sports" },
  { label: "World", hi: "दुनिया", href: "/category/international-news" },
  { label: "Video", hi: "वीडियो", href: "/video" },
];

export default function Header({ headlines = [], ad }: { headlines?: { title: string; href: string }[]; ad?: { href: string; web: string; mobile: string } | null }) {
  const { t, lang, setLang, theme, toggleTheme, stateName, setStateModalOpen } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLElement | null>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const hindi = lang === "hi";

  useEffect(() => { setMenu(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1100px)");
    const reset = () => { setMenu(null); setMobileOpen(false); };
    query.addEventListener("change", reset);
    return () => query.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    if (!menu) return;
    dropdown.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const shut = (e: Event) => {
      if (e.type === "pointerdown" && (e.target as Element).closest(".dropdown, .nav-item.group")) return;
      setMenu(null);
    };
    window.addEventListener("pointerdown", shut);
    window.addEventListener("scroll", shut, { passive: true });
    window.addEventListener("resize", shut);
    return () => {
      window.removeEventListener("pointerdown", shut);
      window.removeEventListener("scroll", shut);
      window.removeEventListener("resize", shut);
    };
  }, [menu]);

  const isOn = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const open = (el: HTMLElement, items: NavLeaf[]) => {
    const r = el.getBoundingClientRect();
    menuTrigger.current = el;
    setMenu({ top: r.bottom + 8, left: Math.max(8, Math.min(r.left, window.innerWidth - 248)), items });
  };

  return (
    <>
      {/* logo row */}
      <div className="hdr">
        <AppLinks className="hdr-left" />

        <Link href="/" className="brand-link" aria-label="Taaza TV home" style={{ justifySelf: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="m-logo" src="/taaza/logo.png" alt="Taaza TV" />
        </Link>

        <div className="hdr-right">
          <div className="socials">
            {SOCIALS.map((so) => (
              <a key={so.name} href={so.href} target="_blank" rel="noopener noreferrer" aria-label={so.name} title={so.name} className="soc" style={{ background: so.bg }}>
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
      <div className="navbar" onKeyDown={(e) => {
        if (e.key === "Escape" && mobileOpen) { setMobileOpen(false); mobileToggle.current?.focus(); }
      }}>
        <nav className="mobile-topics" aria-label={hindi ? "मुख्य खबरें" : "News sections"}>
          {MOBILE_TOPICS.map((item) => <Link key={item.href} href={item.href} className={`topic-link ${item.href === "/live-tv" ? "topic-live" : ""}`} aria-current={isOn(item.href) ? "page" : undefined} onClick={() => setMobileOpen(false)}>
            {item.href === "/live-tv" && <span className="live-dot" aria-hidden="true" />}{hindi ? item.hi : item.label}
          </Link>)}
          <button ref={mobileToggle} className="mobile-toggle topic-link" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={(e) => { e.currentTarget.focus(); setMobileOpen((v) => !v); }}>
            {hindi ? (mobileOpen ? "बंद करें" : "और") : (mobileOpen ? "Close" : "More")}<span aria-hidden="true">{mobileOpen ? "−" : "+"}</span>
          </button>
        </nav>
        <nav className="navstrip" aria-label={hindi ? "मुख्य नेविगेशन" : "Main navigation"}>
          {NAV.map((n) =>
            "group" in n ? (
              <button
                key={n.label}
                className={`nav-item group ${n.group.some((g) => isOn(g.href)) ? "on" : ""}`}
                aria-expanded={menu?.items === n.group}
                aria-controls={menu?.items === n.group ? "navigation-dropdown" : undefined}
                onClick={(e) => (menu?.items === n.group ? setMenu(null) : open(e.currentTarget, n.group))}
                onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); open(e.currentTarget, n.group); } }}
              >
                {hindi ? n.hi : n.label}
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            ) : (
              <Link key={n.label} href={n.href} className={`nav-item ${isOn(n.href) ? "on" : ""}`} aria-current={isOn(n.href) ? "page" : undefined}>
                {(n.label === "Premium" || n.label === "Live TV") && <span className="nav-flag" />}
                {hindi ? n.hi : n.label}
              </Link>
            ),
          )}
        </nav>
        <span className="nav-div" />
        <div className="nav-tools">
          <div className="lang-dark">
            <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")} title="English">EN</button>
            <button className={`hi ${lang === "hi" ? "on" : ""}`} aria-pressed={lang === "hi"} onClick={() => setLang("hi")} title="Hindi">हिं</button>
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
        <button className="edition" aria-haspopup="dialog" onClick={(e) => { e.currentTarget.focus(); setMenu(null); setStateModalOpen(true); }} title={hindi ? STATE_HI[stateName] : stateName}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{hindi ? STATE_HI[stateName] : stateName}</span>
        </button>
        <nav id="mobile-navigation" className="mobile-navigation" hidden={!mobileOpen} aria-label={hindi ? "मोबाइल नेविगेशन" : "Mobile navigation"}>
          {NAV.map((n) => "group" in n ? (
            <details key={n.label}>
              <summary>{hindi ? n.hi : n.label}</summary>
              {n.group.map((item) => <Link key={item.label} href={item.href} aria-current={isOn(item.href) ? "page" : undefined} onClick={() => { setMobileOpen(false); mobileToggle.current?.focus(); }}>{hindi ? item.hi : item.label}</Link>)}
            </details>
          ) : (
            <Link key={n.label} href={n.href} aria-current={isOn(n.href) ? "page" : undefined} onClick={() => { setMobileOpen(false); mobileToggle.current?.focus(); }}>{hindi ? n.hi : n.label}</Link>
          ))}
        </nav>
      </div>

      {menu && (
        <div ref={dropdown} id="navigation-dropdown" className="dropdown" style={{ top: menu.top, left: menu.left }} onBlur={(e) => {
          // WebKit can blur a tapped link with no next focus target before its click fires.
          // Outside pointer presses are handled separately; preserve that pending click.
          if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setMenu(null);
        }} onKeyDown={(e) => {
          if (e.key === "Escape") { setMenu(null); menuTrigger.current?.focus(); }
        }}>
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
        <div className="ticker-track" tabIndex={0} aria-label={t.breaking}>
          <div className="ticker-run" key={lang}>
            {headlines.length > 0
              ? [0, 1].map((copy) => (
                <span key={copy} aria-hidden={copy === 1 || undefined}>
                  {headlines.map((h) => <span key={h.href}><Link href={h.href} className="ticker-link" tabIndex={copy === 1 ? -1 : undefined}>{h.title}</Link>{"  •  "}</span>)}
                </span>
              ))
              : <><span>{t.tagline}</span><span aria-hidden="true">{"   •   "}{t.tagline}</span></>}
          </div>
        </div>
      </div>

      {/* ad */}
      <div className="m-ad">
        {ad ? (
          <a href={ad.href} target="_blank" rel="noopener noreferrer sponsored">
            <picture>
              <source media="(max-width: 600px)" srcSet={ad.mobile} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ad.web} alt="Taaza TV partner banner" />
            </picture>
          </a>
        ) : (
          <Link href="/category/medha-samman-2026">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/taaza/medha-samman-banner.jpg" alt="Check your name in the Medha Samman list" />
          </Link>
        )}
      </div>
    </>
  );
}
