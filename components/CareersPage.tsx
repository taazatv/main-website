"use client";

import { useState } from "react";
import { useApp } from "./AppProvider";
import { CONTACT } from "@/lib/links";

const DOMAINS = [
  { en: "Reporting & Journalism", hi: "रिपोर्टिंग और पत्रकारिता", icon: "M4 4h12v16H4zM16 8h4v10a2 2 0 0 1-2 2h-2M8 8h4M8 12h4M8 16h2" },
  { en: "Anchoring", hi: "एंकरिंग", icon: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v4" },
  { en: "Video Production & Editing", hi: "वीडियो प्रोडक्शन और एडिटिंग", icon: "M3 6h13v12H3zM16 10l5-3v10l-5-3" },
  { en: "Digital & Social Media", hi: "डिजिटल और सोशल मीडिया", icon: "M7 2h10v20H7zM11 18h2" },
  { en: "Graphics & Design", hi: "ग्राफ़िक्स और डिज़ाइन", icon: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5S13.5 15 15 15h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8zM7.5 11h.01M10.5 7h.01M15 7.5h.01" },
  { en: "Sales & Marketing", hi: "सेल्स और मार्केटिंग", icon: "M3 17l6-6 4 4 8-8M15 7h6v6" },
  { en: "Technology", hi: "टेक्नोलॉजी", icon: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" },
];

const WHY = [
  { en: ["Owned by journalists", "A channel owned and run by journalists with over 100 years of combined experience."], hi: ["पत्रकारों का चैनल", "ऐसा चैनल जिसे 100 साल से ज़्यादा अनुभव वाले पत्रकार चलाते हैं।"] },
  { en: ["Seen across India", "The only Hindi channel from Kolkata watched across the country."], hi: ["पूरे भारत में", "कोलकाता का इकलौता हिंदी चैनल जो पूरे देश में देखा जाता है।"] },
  { en: ["TV + digital", "Work across live TV, the website, the mobile app and social media."], hi: ["TV + डिजिटल", "लाइव TV, वेबसाइट, मोबाइल ऐप और सोशल मीडिया पर काम करें।"] },
  { en: ["Room to grow", "Freshers and experienced professionals both get real responsibility, fast."], hi: ["आगे बढ़ने का मौका", "फ्रेशर हों या अनुभवी, यहां जल्दी असली ज़िम्मेदारी मिलती है।"] },
];

export default function CareersPage() {
  const { lang } = useApp();
  const H = lang === "hi";
  const [form, setForm] = useState({ name: "", email: "", mobile: "", domain: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  // no backend: open the reader's mail app with the application filled in; they attach the CV there
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError(H ? "अपना नाम लिखें।" : "Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError(H ? "सही ईमेल लिखें।" : "Please enter a valid email.");
    if (form.mobile.replace(/\D/g, "").length < 10) return setError(H ? "सही मोबाइल नंबर लिखें।" : "Please enter a valid mobile number.");
    if (!form.domain) return setError(H ? "काम का क्षेत्र चुनें।" : "Please choose a work domain.");
    setError("");
    const subject = `Career application – ${form.domain}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      `Preferred work domain: ${form.domain}`,
      "",
      form.message.trim(),
      "",
      "(CV attached)",
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="careers">
      <section className="cr-hero on-dark">
        <div className="cr-hero-txt">
          <div className="cr-kick">{H ? "करियर" : "CAREERS"}</div>
          <h1>{H ? "Taaza TV के साथ खबरें बनाइए" : "Make the news with Taaza TV"}</h1>
          <p>
            {H
              ? "हम हमेशा जोशीले नए और अनुभवी साथियों की तलाश में रहते हैं। क्या आप हमारी बढ़ती टीम का हिस्सा बन सकते हैं? अपना CV और पसंदीदा काम का क्षेत्र भेजें।"
              : "We are constantly in search of dynamic, budding and experienced team members. Think you can fit in our ever-expanding team? Send us your CV and preferred work domain."}
          </p>
          <div className="cr-ctas">
            <a href="#apply" className="cr-btn">{H ? "अभी आवेदन करें" : "Apply now"}</a>
            <a href={`mailto:${CONTACT.email}?subject=Career%20application`} className="cr-btn ghost">{CONTACT.email}</a>
          </div>
        </div>
        <div className="cr-hero-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/taaza/logo.png" alt="" />
          <span className="cr-live"><i />{H ? "हम भर्ती कर रहे हैं" : "We're hiring"}</span>
        </div>
      </section>

      <section className="cr-sec">
        <h2 className="cr-h2">{H ? "हमसे क्यों जुड़ें" : "Why join us"}</h2>
        <div className="cr-why">
          {WHY.map((w, i) => {
            const [t, d] = H ? w.hi : w.en;
            return (
              <div key={t} className="cr-card">
                <span className="cr-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="cr-sec">
        <h2 className="cr-h2">{H ? "काम के क्षेत्र" : "Work domains"}</h2>
        <p className="cr-lede">{H ? "इनमें से किसी भी क्षेत्र में आवेदन करें। फ्रेशर और अनुभवी, दोनों का स्वागत है।" : "Apply in any of these areas. Freshers and experienced professionals are both welcome."}</p>
        <div className="cr-domains">
          {DOMAINS.map((d) => (
            <button key={d.en} type="button" className={`cr-domain ${form.domain === d.en ? "on" : ""}`} onClick={() => { setForm({ ...form, domain: d.en }); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d.icon} /></svg>
              <span>{H ? d.hi : d.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="apply" className="cr-sec cr-apply">
        <div className="cr-apply-info">
          <h2 className="cr-h2">{H ? "आवेदन करें" : "Apply now"}</h2>
          <p className="cr-lede">{H ? "फॉर्म भरें। आपका ईमेल ऐप हमारे पते के साथ खुलेगा, उसमें अपना CV जोड़कर भेज दें।" : "Fill in the form. Your email app will open addressed to us; attach your CV and send."}</p>
          <ol className="cr-steps">
            <li>{H ? "अपनी जानकारी भरें" : "Fill in your details"}</li>
            <li>{H ? "ईमेल में अपना CV जोड़ें" : "Attach your CV to the email"}</li>
            <li>{H ? "भेजें, हमारी टीम संपर्क करेगी" : "Send it, and our team will get in touch"}</li>
          </ol>
        </div>

        <form className="auth-card cr-form auth-form" onSubmit={submit} noValidate>
          <label className="auth-field"><span>{H ? "पूरा नाम" : "Full name"}</span><input value={form.name} onChange={set("name")} autoComplete="name" placeholder={H ? "आपका नाम" : "Your name"} /></label>
          <div className="cr-row">
            <label className="auth-field"><span>{H ? "ईमेल" : "Email"}</span><input type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" /></label>
            <label className="auth-field"><span>{H ? "मोबाइल" : "Mobile"}</span><input type="tel" value={form.mobile} onChange={set("mobile")} autoComplete="tel" placeholder="98XXXXXXXX" /></label>
          </div>
          <label className="auth-field">
            <span>{H ? "काम का क्षेत्र" : "Preferred work domain"}</span>
            <select value={form.domain} onChange={set("domain")}>
              <option value="">{H ? "चुनें" : "Choose one"}</option>
              {DOMAINS.map((d) => <option key={d.en} value={d.en}>{H ? d.hi : d.en}</option>)}
            </select>
          </label>
          <label className="auth-field"><span>{H ? "अपने बारे में (वैकल्पिक)" : "About you (optional)"}</span><textarea rows={4} value={form.message} onChange={set("message")} placeholder={H ? "अनुभव, कौशल, आप हमसे क्यों जुड़ना चाहते हैं…" : "Experience, skills, why you'd like to join…"} /></label>
          {error && <p className="auth-err" role="alert">{error}</p>}
          {sent && !error && <p className="cr-ok" role="status">{H ? `आपका ईमेल ऐप खुल गया है। अपना CV जोड़कर ${CONTACT.email} पर भेजें।` : `Your email app has opened. Attach your CV and send it to ${CONTACT.email}.`}</p>}
          <button className="auth-btn" type="submit">{H ? "आवेदन भेजें" : "Send application"}</button>
        </form>
      </section>
    </div>
  );
}
