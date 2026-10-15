"use client";

import { useApp } from "./AppProvider";

const HIGHLIGHTS = [
  "The only Hindi channel from Kolkata being seen across India",
  "Great activation on digital (website and mobile app)",
  "Only channel giving both ATL + BTL activation",
  "Flexible for any innovation in programming and content",
  "Channel owned and run by journalists",
];

export default function AboutPage() {
  const { lang } = useApp();
  const hindi = lang === "hi";
  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">TAAZA TV</div>
          <h1 className="m-cat">{hindi ? "हमारे बारे में" : "About us"}</h1>
        </div>
      </div>
      <div className="info">
        <section className="art-body">
          <div className="kick">COMPANY PROFILE</div>
          <p>
            Taaza TV has constantly scored with its programming, positioning and packaging, bravely showcasing the
            people&apos;s point of view. The success is merely an endorsement of the group&apos;s philosophy to keep the
            viewer first and for its stand of empowering viewers. In the manner of a pioneer and trailblazer, by keeping
            its programming initiatives &lsquo;fresh&rsquo; and addressing the aspiration of the viewers, Taaza TV renews
            its commitment to the people.
          </p>
          <p>
            The channel caters to every age group. For the news-conscious predominant section it has several news-related
            shows ranging from hard-core news to fast news to daily planners, analysis, debates and discussions. We
            haven&apos;t left any segment of the society untouched!
          </p>
          <div className="glance">
            <div className="kick">HIGHLIGHTS</div>
            <ul className="art-hl">{HIGHLIGHTS.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </section>

        <section id="mission" className="art-body">
          <div className="kick">MISSION &amp; VISION</div>
          <p>
            Taaza TV is a channel owned completely by journalists, who combined have over 100 years of experience in the
            field. Our aim is to make Taaza TV the most ethical channel of India through technological innovations and
            quality programme content. Casting aside the shades of religious or political interventions, we bring to you
            news, transparent to the core. We seek to maintain the highest standards of journalism.
          </p>
          <p>
            Our mission is to create the finest possible news content and to present breaking, local, national and
            international news, as it unfolds, without bias. Our goal is to deliver accurate news to our viewers quickly
            so that they are well informed at all times. We are focused on ground reportage and on news that is of the
            greatest relevance to the viewers.
          </p>
        </section>
      </div>
    </div>
  );
}
