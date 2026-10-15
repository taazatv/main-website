"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { useApp } from "./AppProvider";
import { content, footAHref, footBHref, footCHref, SOCIALS } from "@/lib/data";
import { GROUP_COMPANIES, LEGAL } from "@/lib/links";
import AppLinks from "./AppLinks";

function FooterGroup({ title, children, companies = false }: { title: string; children: ReactNode; companies?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={companies ? "fgroup" : "fcol"}>
      <div className={`${companies ? "gh" : "fh"} footer-desktop-label`}>{title}</div>
      <button className="footer-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {title}<span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={id} className="footer-group-content" data-open={open}>{children}</div>
    </div>
  );
}

export default function Footer() {
  const { t, lang } = useApp();
  const c = content(lang);
  return (
    <footer className="foot on-dark">
      <section className="mobile-app-download" aria-label={t.appKicker}>
        <span className="download-kicker">{t.appKicker}</span>
        <h2>{lang === "hi" ? "हर खबर, अब आपके साथ।" : "Your news. Wherever you go."}</h2>
        <p>{t.appTitle}</p>
        <AppLinks className="footer-app-links" />
        <div className="footer-socials">
          <span>{t.follow}</span>
          <div className="socials">
            {SOCIALS.map((so) => <a key={so.name} href={so.href} target="_blank" rel="noopener noreferrer" aria-label={so.name} title={so.name} className="soc" style={{ background: so.bg }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {so.paths.map((d) => <path key={d} d={d} />)}
              </svg>
            </a>)}
          </div>
        </div>
      </section>
      <div className="r-foot">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/taaza/logo.png" alt="Taaza TV" />
          <div className="fd">{t.footerTagline}</div>
        </div>
        <FooterGroup title={t.popularCats}>
          {c.footA.map((x, i) => <Link key={x} href={footAHref[i]}>{x}</Link>)}
        </FooterGroup>
        <FooterGroup title={t.more}>
          {c.footB.map((x, i) => <Link key={x} href={footBHref[i]}>{x}</Link>)}
        </FooterGroup>
        <FooterGroup title={t.quickLinks}>
          {c.footC.map((x, i) => footCHref[i].startsWith("http") ? <a key={x} href={footCHref[i]} target="_blank" rel="noopener noreferrer">{x}</a> : <Link key={x} href={footCHref[i]}>{x}</Link>)}
        </FooterGroup>
      </div>

      <FooterGroup title={t.group} companies>
        {GROUP_COMPANIES.map((g) => g.href
          ? <a key={g.name} href={g.href} target="_blank" rel="noopener noreferrer" className="fg-co">{lang === "hi" ? g.hi : g.name} — {g.desc}</a>
          : <span key={g.name}>{lang === "hi" ? g.hi : g.name} — {g.desc}</span>)}
      </FooterGroup>
      <div className="fcopy">
        <span>© 2026 Taaza TV. All rights reserved. • West Bengal · Bihar · Jharkhand · Uttar Pradesh</span>
        <span><a href={LEGAL.terms} target="_blank" rel="noopener noreferrer">Terms and Conditions</a> • <a href={LEGAL.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
      </div>
    </footer>
  );
}
