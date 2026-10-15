"use client";

import { useApp } from "./AppProvider";
import { CONTACT } from "@/lib/links";
import { SOCIALS } from "@/lib/data";

const tel = (n: string) => {
  const d = n.replace(/\D/g, "");
  return `tel:+91${d.startsWith("0") ? d.slice(1) : d}`;
};

export default function ContactPage() {
  const { t, lang } = useApp();
  const hindi = lang === "hi";
  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">TAAZA TV</div>
          <h1 className="m-cat">{hindi ? "संपर्क करें" : "Contact us"}</h1>
        </div>
      </div>
      <div className="info">
        <section className="art-body">
          <div className="kick">WRITE TO US</div>
          <div className="info-grid">
            <a className="info-card lk" href={`mailto:${CONTACT.email}`}>
              <span className="meta">Email</span>
              <strong>{CONTACT.email}</strong>
            </a>
            <a className="info-card lk" href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
              <span className="meta">WhatsApp</span>
              <strong>{CONTACT.whatsapp}</strong>
            </a>
            {CONTACT.phones.map((p) => (
              <a key={p} className="info-card lk" href={tel(p)}>
                <span className="meta">{hindi ? "फ़ोन" : "Call us"}</span>
                <strong>{p}</strong>
              </a>
            ))}
          </div>
          <div className="info-follow">
            <span className="meta">{t.follow}</span>
            <div className="socials">
              {SOCIALS.map((so) => (
                <a key={so.name} href={so.href} target="_blank" rel="noopener noreferrer" aria-label={so.name} title={so.name} className="soc" style={{ background: so.bg }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {so.paths.map((d) => <path key={d} d={d} />)}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="advertise" className="art-body">
          <div className="kick">ADVERTISE WITH US</div>
          <p>
            With the support of millions of viewers we have the power to boost your business. Let&apos;s talk about
            innovative ways to showcase your product or service on the Taaza TV channel and digital (social media and
            mobile app).
          </p>
          <p>
            Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
            {CONTACT.phones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={tel(p)}>{p}</a></span>)}.
          </p>
        </section>

        <section id="careers" className="art-body">
          <div className="kick">CAREERS</div>
          <p>
            We are constantly in search of dynamic, budding and experienced team members. Think you can fit in our
            ever-expanding team? Send your CV and preferred work domain to{" "}
            <a href={`mailto:${CONTACT.email}?subject=Career%20application`}>{CONTACT.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
