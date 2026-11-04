"use client";

import { useState } from "react";
import { useApp } from "./AppProvider";
import Link from "next/link";
import { CONTACT } from "@/lib/links";
import { EVENTS as ALL_EVENTS } from "@/lib/events";

const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

/** Where an advertiser's brand can appear. */
const REACH = [
  { en: ["Live TV channel", "A national Hindi news channel from eastern India, on air round the clock."], hi: ["लाइव TV चैनल", "पूर्वी भारत का राष्ट्रीय हिंदी न्यूज़ चैनल, चौबीसों घंटे ऑन एयर।"], icon: "M3 6h18v12H3zM8 21h8M12 18v3" },
  { en: ["Website", "Hindi and English news from West Bengal, Bihar, Jharkhand, Uttar Pradesh and India."], hi: ["वेबसाइट", "पश्चिम बंगाल, बिहार, झारखंड, उत्तर प्रदेश और देश की हिंदी-अंग्रेज़ी खबरें।"], icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" },
  { en: ["Mobile app", "The Taaza TV app on Android and iPhone, with breaking-news alerts."], hi: ["मोबाइल ऐप", "Android और iPhone पर Taaza TV ऐप, ब्रेकिंग न्यूज़ अलर्ट के साथ।"], icon: "M7 2h10v20H7zM11 18h2" },
  { en: ["Social media", "YouTube, Facebook, Instagram, X and WhatsApp audiences."], hi: ["सोशल मीडिया", "YouTube, Facebook, Instagram, X और WhatsApp पर दर्शक।"], icon: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" },
  { en: ["Newspaper", "Chhapte Chhapte, the Taaza TV group's Hindi daily from Kolkata, for print ads."], hi: ["अख़बार", "छपते छपते, Taaza TV ग्रुप का कोलकाता से निकलने वाला हिंदी दैनिक, प्रिंट विज्ञापन के लिए।"], icon: "M4 4h12v16H4zM16 8h4v10a2 2 0 0 1-2 2h-2M8 8h4M8 12h4M8 16h2" },
];

/** Kinds of campaign, offered as the enquiry form's options. */
const FORMATS = [
  { en: "TV commercials", hi: "TV विज्ञापन", icon: "M3 6h13v12H3zM16 10l5-3v10l-5-3" },
  { en: "Sponsored shows & segments", hi: "प्रायोजित शो और सेगमेंट", icon: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v4" },
  { en: "Website & app banners", hi: "वेबसाइट और ऐप बैनर", icon: "M3 4h18v16H3zM3 9h18M8 14h8" },
  { en: "Newspaper ads (Chhapte Chhapte)", hi: "अख़बार विज्ञापन (छपते छपते)", icon: "M4 4h12v16H4zM16 8h4v10a2 2 0 0 1-2 2h-2M8 8h4M8 12h4M8 16h2" },
  { en: "Sponsored stories", hi: "प्रायोजित स्टोरी", icon: "M4 4h12v16H4zM16 8h4v10a2 2 0 0 1-2 2h-2M8 8h4M8 12h4M8 16h2" },
  { en: "Social media campaigns", hi: "सोशल मीडिया कैंपेन", icon: "M3 11l18-8-8 18-2-8z" },
  { en: "Event sponsorship", hi: "इवेंट स्पॉन्सरशिप", icon: "M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z" },
  { en: "ATL + BTL activation", hi: "ATL + BTL एक्टिवेशन", icon: "M3 17l6-6 4 4 8-8M15 7h6v6" },
];

/** Taaza TV's own events that brands can sponsor (the ones with an official site). */
const EVENTS = ALL_EVENTS.filter((e) => e.url);

/** Brands that have partnered with these events, as listed on youngotsav.com and the Kwizdom banner. */
const PAST_SPONSORS = [
  { name: "Coca-Cola", logo: "coca-cola.png" },
  { name: "Royal Enfield", logo: "royal-enfield.png" },
  { name: "IndianOil", logo: "indianoil.png" },
  { name: "Emami Smart & Handsome", logo: "emami-smart-handsome.png" },
  { name: "Wild Stone", logo: "wild-stone.png" },
  { name: "Priya Gold Snakker", logo: "priya-gold-snakker.png" },
  { name: "Nicco Park", logo: "nicco-park.png" },
  { name: "JIS University", logo: "jis-university.png" },
  { name: "Bhagwati Biscuits", logo: "bhagwati.png" },
  { name: "Impakto", logo: "impakto.avif" },
  { name: "Oshea Herbals", logo: "oshea-herbals.png" },
  { name: "Win Pens", logo: "win-pens.png" },
];

export default function AdvertisePage() {
  const { lang } = useApp();
  const H = lang === "hi";
  const [form, setForm] = useState({ name: "", company: "", email: "", mobile: "", format: "", budget: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  // no backend: open the advertiser's mail app with the enquiry filled in
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError(H ? "अपना नाम लिखें।" : "Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError(H ? "सही ईमेल लिखें।" : "Please enter a valid email.");
    if (form.mobile.replace(/\D/g, "").length < 10) return setError(H ? "सही मोबाइल नंबर लिखें।" : "Please enter a valid mobile number.");
    setError("");
    const subject = `Advertising enquiry${form.company.trim() ? ` – ${form.company.trim()}` : ""}`;
    const body = [
      `Name: ${form.name.trim()}`,
      ...(form.company.trim() ? [`Company / brand: ${form.company.trim()}`] : []),
      `Email: ${form.email.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      ...(form.format ? [`Interested in: ${form.format}`] : []),
      ...(form.budget ? [`Budget: ${form.budget}`] : []),
      "",
      form.message.trim(),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="careers">
      {/* compact banner: pitch on the left, a collage of our own event photos on the right, key numbers below */}
      <section className="biz-top">
        <div className="biz-top-txt">
          <span className="biz-top-kick">{H ? "हमारे साथ विज्ञापन करें" : "ADVERTISE WITH US"}</span>
          <h1>
            {H ? <>TV, अख़बार, डिजिटल और इवेंट्स पर <em>लाखों लोगों</em> तक पहुंचें</> : <>Reach <em>millions</em> across TV, print, digital and events</>}
          </h1>
          <p>
            {H
              ? "Taaza TV चैनल, छपते छपते अख़बार, वेबसाइट, ऐप, सोशल मीडिया और हमारे बड़े इवेंट्स, सब एक ही पार्टनर के साथ।"
              : "One partner for the Taaza TV channel, the Chhapte Chhapte newspaper, our website, app and social media, and East India's biggest events."}
          </p>
          <div className="biz-top-ctas">
            <a href="#enquire" className="cr-btn">{H ? "अभी संपर्क करें" : "Enquire now"}</a>
            <a href={tel(CONTACT.phones[0])} className="biz-top-call">{H ? "कॉल करें" : "Call"} {CONTACT.phones[0]}</a>
          </div>
        </div>
        <div className="biz-top-mosaic" aria-hidden="true">
          {["Taaza Dandiya", "Youngotsav", "Medha Samman"].map((name) => {
            const img = EVENTS.find((e) => e.name === name)?.img;
            // eslint-disable-next-line @next/next/no-img-element
            return img ? <img key={name} src={img} alt="" /> : null;
          })}
        </div>
      </section>
      <div className="biz-top-stats">
        {[
          { n: "50,000+", en: "Taaza Dandiya visitors a year", hi: "हर साल Taaza Dandiya में लोग" },
          { n: "3 lakh+", en: "college students via Youngotsav", hi: "Youngotsav से कॉलेज छात्र" },
          { n: "115", en: "schools in Kwizdom", hi: "Kwizdom में स्कूल" },
          { n: "20,000+", en: "toppers honoured at Medha Samman", hi: "Medha Samman में सम्मानित टॉपर्स" },
        ].map((st) => (
          <div key={st.n} className="biz-top-stat"><strong>{st.n}</strong><span>{H ? st.hi : st.en}</span></div>
        ))}
      </div>

      <section className="cr-sec">
        <h2 className="cr-h2">{H ? "आपका ब्रांड कहां दिखेगा" : "Where your brand appears"}</h2>
        <p className="cr-lede">{H ? "एक ही कैंपेन से TV, अख़बार और डिजिटल, तीनों पर पहुंचें।" : "Reach audiences on TV, in print and on digital with one campaign."}</p>
        <div className="cr-why five">
          {REACH.map((r) => {
            const [t, d] = H ? r.hi : r.en;
            return (
              <div key={t} className="cr-card biz-reach">
                <span className="biz-ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon} /></svg></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cr-sec">
        <h2 className="cr-h2">{H ? "विज्ञापन के तरीके" : "Ways to advertise"}</h2>
        <p className="cr-lede">{H ? "जो आपके लक्ष्य के लिए सही हो, वह चुनें। हम आपके लिए पूरा कैंपेन प्लान कर सकते हैं।" : "Pick what suits your goal, or let us plan the whole campaign for you."}</p>
        <div className="cr-domains">
          {FORMATS.map((f) => (
            <button key={f.en} type="button" className={`cr-domain ${form.format === f.en ? "on" : ""}`} onClick={() => { setForm({ ...form, format: f.en }); document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" }); }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={f.icon} /></svg>
              <span>{H ? f.hi : f.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="cr-sec">
        <h2 className="cr-h2">{H ? "हमारे इवेंट्स के ज़रिए विज्ञापन" : "Advertise through our events"}</h2>
        <p className="cr-lede">
          {H
            ? "Taaza TV के अपने इवेंट्स में अपने ब्रांड को सीधे परिवारों, छात्रों और युवाओं तक पहुंचाएं: मंच और वेन्यू पर ब्रांडिंग, टाइटल या को-स्पॉन्सरशिप, और Taaza TV, वेबसाइट व सोशल मीडिया पर प्रचार।"
            : "Put your brand in front of families, students and young people at Taaza TV's own events: stage and venue branding, title or co-sponsorship, and promotion on Taaza TV, the website and social media."}
        </p>
        <div className="ev-grid">
          {EVENTS.map((ev) => (
            <article key={ev.name} className="ev-card">
              <Link href={`/events/${ev.slug}`} className="ev-top" aria-label={ev.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ev.img ?? ""} alt={ev.name} loading="lazy" />
                <span className="ev-tag">{H ? ev.tag.hi : ev.tag.en}</span>
                <h3>{ev.name}</h3>
              </Link>
              <div className="ev-body">
                <div className="ev-stats">{ev.stats.map((s) => <span key={s.en}>{H ? s.hi : s.en}</span>)}</div>
                <p>{H ? ev.desc.hi : ev.desc.en}</p>
                {ev.audience && <div className="ev-aud"><span>{H ? "दर्शक" : "Audience"}</span>{H ? ev.audience.hi : ev.audience.en}</div>}
                <div className="ev-acts">
                  <button
                    type="button"
                    className="ev-btn"
                    onClick={() => {
                      setForm({ ...form, format: "Event sponsorship", message: form.message || `I'd like to sponsor ${ev.name}.` });
                      document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {H ? "इस इवेंट को स्पॉन्सर करें" : "Sponsor this event"} →
                  </button>
                  <Link href={`/events/${ev.slug}`} className="ev-link">{H ? "और जानें" : "Know more"} →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ev-proof">
          <div className="ev-sponsors">
            <span className="ev-proof-h">{H ? "हमारे इवेंट्स से जुड़े ब्रांड" : "Brands that have partnered with our events"}</span>
            {/* logo ticker: the list is drawn twice so the loop is seamless; hover pauses it */}
            <div className="logo-ticker" aria-label={PAST_SPONSORS.map((b) => b.name).join(", ")}>
              <div className="logo-track">
                {[0, 1].map((copy) => PAST_SPONSORS.map((b) => (
                  <span key={`${copy}-${b.name}`} className="logo-tile" title={b.name} aria-hidden={copy === 1 || undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/taaza/sponsors/${b.logo}`} alt={copy === 0 ? b.name : ""} loading="lazy" />
                  </span>
                )))}
              </div>
            </div>
          </div>
          <blockquote className="ev-quote">
            <p>“{H ? "डिफ़रेंशियल ब्रांडिंग ने एक अलग पहचान बनाई जो बाज़ार में सबसे अलग दिखी।" : "The differential branding created a distinctive identity that stood out in the market."}”</p>
            <cite>Sagnik Banik, MD, Ajanta Shoes &amp; Impakto · {H ? "Youngotsav पार्टनर" : "Youngotsav partner"}</cite>
          </blockquote>
        </div>
        <p className="ev-more">
          {H ? "Winter Carnival जैसे दूसरे Taaza TV इवेंट्स के लिए भी हमसे पूछें।" : "Ask us about other Taaza TV events too, such as Winter Carnival."}
        </p>
      </section>

      <section id="enquire" className="cr-sec cr-apply">
        <div className="cr-apply-info">
          <h2 className="cr-h2">{H ? "हमसे बात करें" : "Talk to us"}</h2>
          <p className="cr-lede">{H ? "फॉर्म भरें, या सीधे हमारी विज्ञापन टीम से संपर्क करें।" : "Fill in the form, or reach our advertising team directly."}</p>
          <div className="biz-contacts">
            <a href={`mailto:${CONTACT.email}?subject=Advertising%20enquiry`} className="biz-contact">
              <span className="biz-ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16v16H4zM4 6l8 7 8-7" /></svg></span>
              <span><small>{H ? "ईमेल" : "Email"}</small>{CONTACT.email}</span>
            </a>
            <a href={tel(CONTACT.phones[0])} className="biz-contact">
              <span className="biz-ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg></span>
              <span><small>{H ? "फ़ोन" : "Phone"}</small>{CONTACT.phones.join(" / ")}</span>
            </a>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="biz-contact">
              <span className="biz-ic"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" /></svg></span>
              <span><small>WhatsApp</small>{CONTACT.whatsapp}</span>
            </a>
          </div>
        </div>

        <form className="auth-card cr-form auth-form" onSubmit={submit} noValidate>
          <div className="cr-row">
            <label className="auth-field"><span>{H ? "आपका नाम" : "Your name"}</span><input value={form.name} onChange={set("name")} autoComplete="name" placeholder={H ? "नाम" : "Name"} /></label>
            <label className="auth-field"><span>{H ? "कंपनी / ब्रांड" : "Company / brand"}</span><input value={form.company} onChange={set("company")} autoComplete="organization" placeholder={H ? "वैकल्पिक" : "Optional"} /></label>
          </div>
          <div className="cr-row">
            <label className="auth-field"><span>{H ? "ईमेल" : "Email"}</span><input type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@company.com" /></label>
            <label className="auth-field"><span>{H ? "मोबाइल" : "Mobile"}</span><input type="tel" value={form.mobile} onChange={set("mobile")} autoComplete="tel" placeholder="98XXXXXXXX" /></label>
          </div>
          <div className="cr-row">
            <label className="auth-field">
              <span>{H ? "किसमें रुचि है" : "Interested in"}</span>
              <select value={form.format} onChange={set("format")}>
                <option value="">{H ? "चुनें (वैकल्पिक)" : "Choose (optional)"}</option>
                {FORMATS.map((f) => <option key={f.en} value={f.en}>{H ? f.hi : f.en}</option>)}
              </select>
            </label>
            <label className="auth-field">
              <span>{H ? "बजट" : "Budget"}</span>
              <select value={form.budget} onChange={set("budget")}>
                <option value="">{H ? "चुनें (वैकल्पिक)" : "Choose (optional)"}</option>
                {["Under ₹50,000", "₹50,000 – ₹2 lakh", "₹2 lakh – ₹10 lakh", "Above ₹10 lakh"].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>
          </div>
          <label className="auth-field"><span>{H ? "अपने कैंपेन के बारे में बताएं" : "Tell us about your campaign"}</span><textarea rows={4} value={form.message} onChange={set("message")} placeholder={H ? "प्रोडक्ट, लक्ष्य, शहर/राज्य, समय…" : "Product, goal, cities or states, timing…"} /></label>
          {error && <p className="auth-err" role="alert">{error}</p>}
          {sent && !error && <p className="cr-ok" role="status">{H ? `आपका ईमेल ऐप खुल गया है। ${CONTACT.email} पर भेज दें, हमारी टीम जल्द संपर्क करेगी।` : `Your email app has opened. Send it to ${CONTACT.email} and our team will be in touch.`}</p>}
          <button className="auth-btn" type="submit">{H ? "पूछताछ भेजें" : "Send enquiry"}</button>
        </form>
      </section>
    </div>
  );
}
