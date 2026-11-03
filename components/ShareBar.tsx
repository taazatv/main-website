"use client";

import { useEffect, useState } from "react";
import { useApp } from "./AppProvider";

const ICONS = {
  whatsapp: "M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.6C5.8.6.7 5.68.7 11.95c0 2 .52 3.95 1.52 5.67L.6 23.5l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03",
  facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
  instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88",
};

const Icon = ({ d, size = 17 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);

/**
 * Round brand-icon share buttons for an article. `url` defaults to the page the reader is on.
 * Instagram has no web share link: phones get the system share sheet, desktops get the link
 * copied and Instagram DMs opened to paste it into.
 */
export default function ShareBar({ title, url: fixedUrl, className = "" }: { title: string; url?: string; className?: string }) {
  const { lang } = useApp();
  const H = lang === "hi";
  const [url, setUrl] = useState(fixedUrl ?? "");
  const [note, setNote] = useState("");

  useEffect(() => { if (!fixedUrl) setUrl(window.location.href); }, [fixedUrl]);
  useEffect(() => {
    if (!note) return;
    const id = setTimeout(() => setNote(""), 2600);
    return () => clearTimeout(id);
  }, [note]);

  const u = encodeURIComponent(url);
  const links = [
    { key: "whatsapp", label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - Taaza TV\n${url}`)}` },
    { key: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: "x", label: "X (Twitter)", href: `https://x.com/intent/tweet?url=${u}&text=${encodeURIComponent(title)}&via=taazatv` },
  ] as const;

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); return true; } catch {}
    // no async clipboard on plain-http origins and some in-app browsers
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { return document.execCommand("copy"); } catch { return false; } finally { ta.remove(); }
  };

  const copyLink = async () => {
    setNote((await copy()) ? (H ? "लिंक कॉपी हो गया" : "Link copied") : (H ? "लिंक कॉपी नहीं हो सका" : "Couldn't copy link"));
  };

  const instagram = async () => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
      return;
    }
    const ok = await copy();
    window.open("https://www.instagram.com/direct/inbox/", "_blank", "noopener,noreferrer");
    setNote(ok ? (H ? "लिंक कॉपी हो गया — Instagram में पेस्ट करें" : "Link copied — paste it in Instagram") : (H ? "लिंक कॉपी नहीं हो सका" : "Couldn't copy link"));
  };

  return (
    <div className={`share-bar ${className}`}>
      <span className="share-lbl">{H ? "शेयर करें" : "Share"}</span>
      <div className="share-icons">
        {links.map((l) => (
          <a key={l.key} className={`share-ic share-${l.key}`} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${H ? "शेयर करें" : "Share on"} ${l.label}`} title={l.label}>
            <Icon d={ICONS[l.key]} />
          </a>
        ))}
        <button type="button" className="share-ic share-instagram" onClick={instagram} aria-label={`${H ? "शेयर करें" : "Share on"} Instagram`} title="Instagram">
          <Icon d={ICONS.instagram} />
        </button>
        <button type="button" className="share-ic share-copy" onClick={copyLink} aria-label={H ? "लिंक कॉपी करें" : "Copy link"} title={H ? "लिंक कॉपी करें" : "Copy link"}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
          </svg>
        </button>
      </div>
      <span className="share-note" role="status" aria-live="polite">{note}</span>
    </div>
  );
}
