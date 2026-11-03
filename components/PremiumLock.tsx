"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "./AppProvider";
import { useAuth } from "./AuthProvider";

/** Premium stories: signed-out readers get the teaser and a sign-in box instead of the full story. */
export default function PremiumLock({ teaser, children }: { teaser: ReactNode; children: ReactNode }) {
  const { lang } = useApp();
  const { user, ready } = useAuth();
  const pathname = usePathname();
  const H = lang === "hi";

  if (ready && user) return <>{children}</>;
  return (
    <>
      <div className="prem-teaser">{teaser}</div>
      <div className="prem-lock">
        <span className="tag tag-neutral">{H ? "प्रीमियम" : "PREMIUM"}</span>
        <div className="t1">{H ? "यह खबर सिर्फ़ मेंबर्स के लिए है" : "This story is for Taaza TV members"}</div>
        <p className="meta">{H ? "पूरी खबर पढ़ने के लिए साइन इन करें।" : "Sign in to read the full story."}</p>
        <Link href={`/login?next=${encodeURIComponent(pathname)}`} className="btn btn-primary">{H ? "साइन इन करें" : "Sign in to read"}</Link>
      </div>
    </>
  );
}
