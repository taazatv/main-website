"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";
import { content, footAHref, footBHref } from "@/lib/data";

export default function Footer() {
  const { t, lang } = useApp();
  const c = content(lang);
  return (
    <footer className="foot on-dark">
      <div className="r-foot">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/taaza/logo.png" alt="Taaza TV" />
          <div className="fd">{t.footerTagline}</div>
        </div>
        <div className="fcol">
          <div className="fh">{t.popularCats}</div>
          {c.footA.map((x, i) => <Link key={x} href={footAHref[i]}>{x}</Link>)}
        </div>
        <div className="fcol">
          <div className="fh">{t.more}</div>
          {c.footB.map((x, i) => <Link key={x} href={footBHref[i]}>{x}</Link>)}
        </div>
        <div className="fcol">
          <div className="fh">{t.quickLinks}</div>
          {c.footC.map((x) => <a key={x} href="#">{x}</a>)}
        </div>
      </div>

      <div className="fgroup">
        <span className="gh">{t.group}</span>
        <span>Taaza TV — National Hindi Channel from Eastern India</span>
        <span>Chhapte Chhapte — Hindi Daily Newspaper</span>
        <span>Taaza Digital</span>
        <span>Medha Samman</span>
      </div>
      <div className="fcopy">
        <span>© 2026 Taaza TV. All rights reserved. • West Bengal · Bihar · Jharkhand · Uttar Pradesh</span>
        <span>Terms and Conditions • Privacy Policy</span>
      </div>
    </footer>
  );
}
