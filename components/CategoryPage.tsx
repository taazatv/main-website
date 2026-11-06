"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { CATEGORIES, STATES, STATE_HI, STATE_SLUG, categoryLead, content, stateForSlug } from "@/lib/data";
import { storyHref } from "@/lib/stories";
import type { NewsItem, SportTile } from "@/lib/taaza";

export default function CategoryPage({ slug, items = [], tiles = [] }: { slug: string; items?: NewsItem[]; tiles?: SportTile[] }) {
  const { t, lang, setStateName, loaded } = useApp();
  const [sort, setSort] = useState(0);
  // opening a state's page switches the reader's edition to that state
  // (after AppProvider has restored the saved edition, or it would overwrite this)
  const pageState = stateForSlug(slug);
  useEffect(() => { if (loaded && pageState) setStateName(pageState); }, [loaded, pageState, setStateName]);
  const c = content(lang);
  const cat = CATEGORIES[slug] ?? { en: slug, hi: slug };
  // real stories from taazatv.com when available, otherwise the sample content
  const hasReal = items.length >= 3;
  const ordered = sort === 1 ? [...items].reverse() : items;
  const realLead = ordered.find((x) => x.img) ?? ordered[0];
  const sampleLead = categoryLead(lang, cat.en);
  const lead = hasReal
    ? { title: realLead.title, desc: realLead.date ?? "", img: realLead.img ?? "/taaza/category-lead.jpg", href: realLead.href }
    : { title: sampleLead.title, desc: sampleLead.desc, img: "/taaza/category-lead.jpg", href: storyHref(sampleLead.title) };
  const realRest = ordered.filter((x) => x.id !== realLead?.id);
  const list = hasReal
    ? realRest.slice(0, 5).map((x) => ({ key: x.id, title: x.title, img: x.img ?? "", meta: x.date ?? "", href: x.href }))
    : (sort === 1 ? [...c.catList].reverse() : c.catList).map((x) => ({ key: x.img, ...x, href: storyHref(x.title) }));
  const grid = hasReal
    ? realRest.slice(5).map((x) => ({ key: x.id, title: x.title, img: x.img ?? "", kicker: x.date ?? "", href: x.href }))
    : (sort === 1 ? [...c.catGrid].reverse() : c.catGrid).map((x) => ({ key: x.img, ...x, href: storyHref(x.title) }));

  return (
    <div>
      <div className="cat-head">
        <div>
          <h1 className="m-cat">{lang === "hi" ? cat.hi : cat.en}</h1>
        </div>
        <div className="seg">
          {[t.sortLatest, t.sortRead, t.sortVideo].map((label, i) => (
            <button key={label} className={`seg-opt ${sort === i ? "on" : ""}`} aria-pressed={sort === i} onClick={() => setSort(i)}>{label}</button>
          ))}
        </div>
      </div>

      {(pageState || slug === "state") && (
        <nav className="st-tabs" aria-label={lang === "hi" ? "राज्य बदलें" : "Change state"}>
          {STATES.map((s) => (
            <Link key={s} href={`/category/${STATE_SLUG[s]}`} className={`st-tab ${pageState === s ? "on" : ""}`} aria-current={pageState === s ? "page" : undefined}>
              {lang === "hi" ? STATE_HI[s] : s}
            </Link>
          ))}
        </nav>
      )}

      <div className="r-2 cat">
        <div className="pad28 br">
          <Link href={lead.href} className="lk">
            <Ph src={lead.img} className="ar-2-1" />
            <h2 className="m-h2 hv-t">{lead.title}</h2>
            <p className="m-lede">{lead.desc}</p>
          </Link>
        </div>
        <div className="pad28">
          <div className="side-head">{t.moreInSection}</div>
          {list.map((x) => (
            <Link key={x.key} href={x.href} className="lk side-row">
              <Ph src={x.img} />
              <div>
                <div className="tt hv-t">{x.title}</div>
                <div className="meta">{x.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {slug === "sports" && (
        <div className="subcats-wide">
          {(tiles.length >= 4 ? tiles : c.subCats).map((sc) => (
            <div key={sc.img} className="subcat">
              <Ph src={sc.img} />
              <div className="subcat-label">{sc.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="cat-grid">
        {grid.map((g) => (
          <Link key={g.key} href={g.href} className="lk card">
            <Ph src={g.img} className="ar-16-10" />
            <div className="kick">{g.kicker}</div>
            <div className="tt hv-t">{g.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
