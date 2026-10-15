"use client";

import { useEffect } from "react";

/** Shown when taazatv.com can't be reached from the server: hand the reader to the same story there. */
export default function ArticleFallback({ url }: { url: string }) {
  useEffect(() => {
    const t = setTimeout(() => window.location.replace(url), 600);
    return () => clearTimeout(t);
  }, [url]);
  return (
    <div className="info" style={{ minHeight: "40vh", alignContent: "center", textAlign: "center" }}>
      <div className="kick">TAAZA TV</div>
      <p style={{ fontSize: 18, fontWeight: 700 }}>Opening the story…</p>
      <p><a href={url}>Tap here if it doesn&apos;t open automatically</a></p>
    </div>
  );
}
