"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { CATEGORIES, STATE_HI, categoryLead, content } from "@/lib/data";
import { storyHref } from "@/lib/stories";

export default function CategoryPage({ slug }: { slug: string }) {
  const { t, lang, stateName } = useApp();
  const [sort, setSort] = useState(0);
  const c = content(lang);
  const cat = CATEGORIES[slug] ?? { en: slug, hi: slug };
  const lead = categoryLead(lang, cat.en);
  const list = sort === 1 ? [...c.catList].reverse() : c.catList;
  const grid = sort === 1 ? [...c.catGrid].reverse() : c.catGrid;

  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">{t.category} · {lang === "hi" ? STATE_HI[stateName] : stateName}</div>
          <h1 className="m-cat">{lang === "hi" ? cat.hi : cat.en}</h1>
        </div>
        <div className="seg">
          {[t.sortLatest, t.sortRead, t.sortVideo].map((label, i) => (
            <button key={label} className={`seg-opt ${sort === i ? "on" : ""}`} aria-pressed={sort === i} onClick={() => setSort(i)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="r-2 cat">
        <div className="pad28 br">
          <Link href={storyHref(lead.title)} className="lk">
            <Ph src="/taaza/category-lead.jpg" className="ar-2-1" />
            <h2 className="m-h2 hv-t">{lead.title}</h2>
            <p className="m-lede">{lead.desc}</p>
          </Link>
        </div>
        <div className="pad28">
          <div className="side-head">{t.moreInSection}</div>
          {list.map((x) => (
            <Link key={x.img} href={storyHref(x.title)} className="lk side-row">
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
          {c.subCats.map((sc) => (
            <div key={sc.img} className="subcat">
              <Ph src={sc.img} />
              <div className="subcat-label">{sc.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="cat-grid">
        {grid.map((g) => (
          <Link key={g.img} href={storyHref(g.title)} className="lk card">
            <Ph src={g.img} className="ar-16-10" />
            <div className="kick">{g.kicker}</div>
            <div className="tt hv-t">{g.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
