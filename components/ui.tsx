"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useApp } from "./AppProvider";

/** Background-image photo block, matching the original's `.grayscale` tiles. */
export function Ph({ src, className = "", style, children }: { src: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`ph ${className}`} style={{ backgroundImage: `url("${src}")`, ...style }}>
      {children}
    </div>
  );
}

export function SecHead({ title, red, href, children }: { title: string; red?: boolean; href?: string; children?: ReactNode }) {
  const { t } = useApp();
  return (
    <div className="sh">
      <span className="sh-title"><span className={`sh-dot ${red ? "red" : ""}`} />{title}</span>
      {children ?? (href && <Link href={href} className="vm">{t.viewMore}</Link>)}
    </div>
  );
}

