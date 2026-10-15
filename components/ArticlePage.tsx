"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { content } from "@/lib/data";
import { CONTACT } from "@/lib/links";
import { articleCopy, getStory, relatedStories, storyHref } from "@/lib/stories";

type Comment = { name: string; text: string; when: string };

export default function ArticlePage({ slug }: { slug: string }) {
  const { t, lang } = useApp();
  const H = lang === "hi";
  const story = getStory(slug)!;
  const copy = articleCopy(story, lang);
  const c = content(lang);
  const related = relatedStories(story, 4);
  const [saved, setSaved] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  // per-story saved state + comments are kept in this browser only
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("tt-saved") || "[]").includes(slug));
      setComments(JSON.parse(localStorage.getItem(`tt-comments-${slug}`) || "[]"));
    } catch {}
    return () => { if (typeof window !== "undefined") window.speechSynthesis?.cancel(); };
  }, [slug]);

  const toggleSave = () => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem("tt-saved") || "[]");
      const next = list.includes(slug) ? list.filter((x) => x !== slug) : [...list, slug];
      localStorage.setItem("tt-saved", JSON.stringify(next));
    } catch {}
    setSaved((v) => !v);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: story.title[lang], url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  const readAloud = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking) { synth.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance([story.title[lang], ...copy.body].join(". "));
    u.lang = H ? "hi-IN" : "en-IN";
    u.onend = u.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  };

  const postComment = () => {
    const text = draft.trim();
    if (!text) return;
    const next = [...comments, { name: H ? "आप" : "You", text, when: H ? "अभी" : "Just now" }];
    setComments(next);
    setDraft("");
    try { localStorage.setItem(`tt-comments-${slug}`, JSON.stringify(next)); } catch {}
  };

  const L = {
    tags: H ? "टैग्स" : "Tags",
    read: H ? "सुनें" : "Read Aloud",
    stop: H ? "रोकें" : "Stop",
    comments: H ? "कमेंट्स" : "Comments",
    none: H ? "अभी कोई कमेंट नहीं है। पहला कमेंट आप करें!" : "No comments to show. Be the first to add one!",
    placeholder: H ? "अपनी राय लिखें…" : "Write a comment…",
    post: H ? "पोस्ट करें" : "Post",
    other: H ? "अन्य संबंधित खबरें" : "Other Relevant Stories",
    news: H ? "खबरें" : "News",
    desk: H ? "Taaza TV डेस्क" : "Taaza TV Desk",
    photo: H ? "(फोटो: Taaza TV)" : "(Photo: Taaza TV)",
  };

  return (
    <>
      <div className="art">
        <article className="art-main">
          <div className="crumbs">
            <Link href="/">{L.news}</Link>
            <span>›</span>
            {story.catSlug ? <Link href={`/category/${story.catSlug}`}>{story.cat[lang]}</Link> : <Link href="/video">{story.cat[lang]}</Link>}
          </div>
          {story.video && <span className="tag tag-accent art-flag">▶ {t.videoNews}</span>}
          {story.premium && <span className="tag tag-neutral art-flag">{t.premiumNews}</span>}
          <h1 className="art-h1">{story.title[lang]}</h1>

          <ul className="art-hl">
            {copy.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          {copy.dek && <p className="art-dek">{copy.dek}</p>}

          <div className="byline">
            <div className="av" />
            <div className="who">{L.desk}<span> • {story.place[lang]} • {H ? "1 सितंबर 2026" : "1 September 2026"} • {story.time[lang]}</span></div>
            <div className="acts">
              <button className={`btn btn-secondary ${speaking ? "is-on" : ""}`} onClick={readAloud}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
                </svg>
                {speaking ? L.stop : L.read}
              </button>
              <button className="btn btn-secondary" onClick={share}>{t.share}</button>
              <button className={`btn btn-secondary ${saved ? "is-on" : ""}`} onClick={toggleSave}>{saved ? "✓ " : ""}{t.save}</button>
            </div>
          </div>

          <Ph src={story.img} className="art-hero">
            {story.video && <span className="art-play"><span className="play-tri" /></span>}
          </Ph>
          <div className="caption">{story.title[lang]} {L.photo}</div>

          <div className="art-body">
            {story.lead ? (
              <>
                <p>{copy.body[0]}</p>
                <p>{copy.body[1]}</p>
                <blockquote>
                  {H ? "\"ब्लॉक के हर भंडारण लाइसेंस का इसी हफ्ते ऑडिट होगा\" — ज़िलाधिकारी" : "\"Every storage licence in the block will be audited this week\" — District Magistrate"}
                </blockquote>
                <p>{copy.body[2]}</p>
                <div className="glance">
                  <div className="kick">{t.atAGlance}</div>
                  <div className="gl">
                    {copy.highlights.map((h) => <div key={h}>• {h}</div>)}
                  </div>
                </div>
                <p>{copy.body[3]}</p>
              </>
            ) : (
              copy.body.map((p) => <p key={p}>{p}</p>)
            )}
          </div>

          <div className="art-tags">
            <span className="kick">{L.tags}:</span>
            {copy.tags.map((tg) => <span key={tg} className="tag tag-neutral">{tg}</span>)}
          </div>

          <section className="comments">
            <div className="side-head">{L.comments} ({comments.length})</div>
            {comments.length === 0 ? (
              <p className="cm-none">{L.none}</p>
            ) : (
              comments.map((cm, i) => (
                <div key={i} className="cm">
                  <div className="cm-who">{cm.name} <span>• {cm.when}</span></div>
                  <div className="cm-text">{cm.text}</div>
                </div>
              ))
            )}
            <div className="cm-form">
              <textarea className="input" aria-label={L.placeholder} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={L.placeholder} rows={3} />
              <button className="btn btn-primary" onClick={postComment} disabled={!draft.trim()}>{L.post}</button>
            </div>
          </section>
        </article>

        <aside className="art-side">
          {story.lead && (
            <>
              <div className="lu-head"><span className="blink" /><span>{t.liveUpdates}</span></div>
              {c.liveUpdates.map((u) => (
                <div key={u.time} className="lu">
                  <div className="tm">{u.time}</div>
                  <div className="tx">{u.text}</div>
                </div>
              ))}
            </>
          )}
          <div className="also-head" style={story.lead ? undefined : { marginTop: 0 }}>{t.alsoRead}</div>
          {related.map((r) => (
            <Link key={r.slug} href={`/article/${r.slug}`} className="lk rel">
              <Ph src={r.img} />
              <div className="tt hv-t">{r.title[lang]}</div>
            </Link>
          ))}
          <div className="alerts on-dark">
            <div className="t1">{t.alertsTitle}</div>
            <div className="t2">{t.alertsBody}</div>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t.joinNow}</a>
          </div>
        </aside>
      </div>

      <div className="video-sec">
        <div className="sh">
          <span className="sh-title"><span className="sh-dot red" />{L.other.toUpperCase()}</span>
        </div>
        <div className="g4">
          {relatedStories(story, 8).slice(4, 8).map((r) => (
            <Link key={r.slug} href={storyHref(r.title.en)} className="lk card">
              <Ph src={r.img} className="ar-16-10" />
              <div className="kick">{r.cat[lang]} • {H ? "1 सितंबर 2026" : "1 Sep 2026"}</div>
              <div className="tt hv-t">{r.title[lang]}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
