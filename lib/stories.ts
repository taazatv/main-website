/* =====================================================================
   Story registry — gives every headline on the site its own article page
   at /article/<slug>, like taazatv.com. Titles come from lib/data.ts in
   both languages; bodies for stories without written copy are generated
   from the story's own details (placeholder until a CMS/API is wired in).
   ===================================================================== */
import { STATES, STATE_HI, content, en, hi, leadsEn, leadsHi, stateEn, stateHi, type Lang, type StateName } from "./data";

type L = { en: string; hi: string };

export type Story = {
  slug: string;
  title: L;
  cat: L;
  catSlug: string; // "" when the category has no listing page
  place: L;
  time: L;
  img: string;
  summary?: L;
  video?: boolean;
  premium?: boolean;
  lead?: boolean; // the fully written top story
};

export const slugify = (s: string) =>
  s.toLowerCase().replace(/₹/g, "rs-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90);

const CAT: Record<string, { name: L; slug: string; place: L }> = {
  National: { name: { en: "National", hi: "देश" }, slug: "national", place: { en: "New Delhi", hi: "नई दिल्ली" } },
  State: { name: { en: "State", hi: "राज्य" }, slug: "state", place: { en: "Kolkata", hi: "कोलकाता" } },
  International: { name: { en: "International", hi: "दुनिया" }, slug: "international-news", place: { en: "World", hi: "दुनिया" } },
  Sports: { name: { en: "Sports", hi: "खेल" }, slug: "sports", place: { en: "Kolkata", hi: "कोलकाता" } },
  Entertainment: { name: { en: "Entertainment", hi: "मनोरंजन" }, slug: "entertainment", place: { en: "Mumbai", hi: "मुंबई" } },
  Health: { name: { en: "Health", hi: "हेल्थ" }, slug: "health", place: { en: "Kolkata", hi: "कोलकाता" } },
  Premium: { name: { en: "Premium", hi: "प्रीमियम" }, slug: "premium", place: { en: "Kolkata", hi: "कोलकाता" } },
  Video: { name: { en: "Video", hi: "वीडियो" }, slug: "", place: { en: "Kolkata", hi: "कोलकाता" } },
  "Election 2026": { name: { en: "Election 2026", hi: "चुनाव 2026" }, slug: "election-2026", place: { en: "Kolkata", hi: "कोलकाता" } },
  "Medha Samman 2026": { name: { en: "Medha Samman 2026", hi: "मेधा सम्मान 2026" }, slug: "medha-samman-2026", place: { en: "Kolkata", hi: "कोलकाता" } },
};
const LEAD_CAT: Record<string, string> = { "International News": "International" };

const img = (seed: string) => `https://picsum.photos/seed/${seed.slice(0, 40)}/1200/675`;
const NOW: L = { en: "1 Sep 2026", hi: "1 सितंबर 2026" };

function build(): Story[] {
  const E = content("en");
  const H = content("hi");
  const out: Story[] = [];
  const add = (s: Omit<Story, "slug" | "img" | "place" | "time"> & Partial<Pick<Story, "img" | "place" | "time">>) => {
    const slug = slugify(s.title.en);
    if (!slug || out.some((o) => o.slug === slug)) return;
    const c = Object.values(CAT).find((x) => x.slug === s.catSlug) ?? CAT.State;
    out.push({ ...s, slug, img: s.img ?? img(slug), place: s.place ?? c.place, time: s.time ?? NOW });
  };
  const cat = (key: string) => ({ cat: CAT[key].name, catSlug: CAT[key].slug });
  const splitMeta = (m: string) => {
    const [c, t] = m.split("•").map((x) => x.trim());
    return { c, t: t ?? c };
  };

  // top story — fully written
  add({
    title: { en: en.leadTitle, hi: hi.leadTitle }, ...cat("National"), lead: true,
    place: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" }, time: { en: "12 min ago", hi: "12 मिनट पहले" },
    img: "/taaza/article-hero.jpg", summary: { en: en.leadBody, hi: hi.leadBody },
  });
  add({ title: { en: en.subATitle, hi: hi.subATitle }, ...cat("State"), time: { en: en.subAMeta, hi: hi.subAMeta } });
  add({ title: { en: en.subBTitle, hi: hi.subBTitle }, ...cat("National"), time: { en: en.subBMeta, hi: hi.subBMeta } });

  // latest updates — category comes from "State • 8 min ago"
  E.topStories.forEach((s, i) => {
    const me = splitMeta(s.meta), mh = splitMeta(H.topStories[i].meta);
    add({ title: { en: s.title, hi: H.topStories[i].title }, ...cat(CAT[me.c] ? me.c : "National"), time: { en: me.t, hi: mh.t } });
  });

  // watch live + most watched + shorts (video stories)
  add({ title: { en: en.liveShow, hi: hi.liveShow }, ...cat("Video"), video: true, img: "/taaza/watch-live.jpg" });
  E.topVideos.forEach((v, i) => add({ title: { en: v.title, hi: H.topVideos[i].title }, ...cat("Video"), video: true, img: v.img.replace("400/300", "1200/900") }));
  E.shorts.forEach((v, i) => add({ title: { en: v.title, hi: H.shorts[i].title }, ...cat("Video"), video: true, img: v.img }));
  E.shortsGrid.slice(0, 8).forEach((v, i) => add({ title: { en: v.title, hi: H.shortsGrid[i].title }, ...cat("Video"), video: true, img: v.img }));

  // state editions
  STATES.forEach((st: StateName) => {
    const e = stateEn[st], h = stateHi[st];
    const place = { en: e.lead.kicker.charAt(0) + e.lead.kicker.slice(1).toLowerCase(), hi: h.lead.kicker };
    add({ title: { en: e.lead.title, hi: h.lead.title }, ...cat("State"), place, time: { en: splitMeta(e.lead.meta).t, hi: splitMeta(h.lead.meta).t }, img: "/taaza/state-lead.jpg" });
    e.list.forEach((t, i) => add({ title: { en: t, hi: h.list[i] }, ...cat("State"), place: { en: st, hi: STATE_HI[st] } }));
  });

  // national / international
  add({ title: { en: en.natLead, hi: hi.natLead }, ...cat("National"), img: "/taaza/national-lead.jpg", place: { en: "Assam", hi: "असम" } });
  E.national.forEach((t, i) => add({ title: { en: t, hi: H.national[i] }, ...cat("National") }));
  E.worldCards.forEach((w, i) => add({ title: { en: w.title, hi: H.worldCards[i].title }, ...cat("International"), time: { en: w.meta, hi: H.worldCards[i].meta }, img: w.img }));

  // entertainment / sports / health / premium
  E.entertainment.forEach((x, i) => add({ title: { en: x.title, hi: H.entertainment[i].title }, ...cat("Entertainment"), time: { en: splitMeta(x.meta).t, hi: splitMeta(H.entertainment[i].meta).t }, img: x.img }));
  E.sports.forEach((x, i) => add({ title: { en: x.title, hi: H.sports[i].title }, ...cat("Sports"), img: x.img }));
  E.health.forEach((x, i) => add({ title: { en: x.title, hi: H.health[i].title }, ...cat("Health"), img: x.img }));
  E.premium.forEach((x, i) => add({ title: { en: x.title, hi: H.premium[i].title }, ...cat("Premium"), premium: true, img: x.img }));

  // category pages
  Object.keys(leadsEn).forEach((k) => {
    const key = LEAD_CAT[k] ?? k;
    add({ title: { en: leadsEn[k].title, hi: leadsHi[k].title }, ...cat(CAT[key] ? key : "National"), summary: { en: leadsEn[k].desc, hi: leadsHi[k].desc }, img: "/taaza/category-lead.jpg" });
  });
  E.catList.forEach((x, i) => add({ title: { en: x.title, hi: H.catList[i].title }, ...cat("Sports"), time: { en: x.meta, hi: H.catList[i].meta }, img: x.img }));
  E.catGrid.forEach((x, i) => add({ title: { en: x.title, hi: H.catGrid[i].title }, ...cat("Sports"), img: x.img }));
  E.related.forEach((x, i) => add({ title: { en: x.title, hi: H.related[i].title }, ...cat("National"), place: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" }, img: x.img }));

  return out;
}

export const STORIES = build();
const byTitle = new Map<string, string>();
for (const s of STORIES) {
  byTitle.set(s.title.en, s.slug);
  byTitle.set(s.title.hi, s.slug);
}

/** Article URL for any headline shown on the site (English or Hindi). */
export const storyHref = (title: string) => {
  const slug = byTitle.get(title);
  return slug ? `/article/${slug}` : "/";
};
export const getStory = (slug: string) => STORIES.find((s) => s.slug === slug);

/** Other stories to show under an article: same category first, then the rest. */
export function relatedStories(s: Story, n = 4) {
  const same = STORIES.filter((o) => o.slug !== s.slug && o.catSlug === s.catSlug && !o.video);
  const rest = STORIES.filter((o) => o.slug !== s.slug && o.catSlug !== s.catSlug && !o.video);
  return [...same, ...rest].slice(0, n);
}

/* ---------------- article copy ---------------- */
const LEAD_BODY: { en: string[]; hi: string[] } = {
  en: [
    "Eleven people died and at least nineteen were injured when a powerful explosion tore through a firecracker manufacturing unit on the edge of the district on Tuesday morning. The blast was heard nearly three kilometres away.",
    "Trains on the adjoining section were held for close to three hours as debris landed near the tracks. Railway officials said services resumed after a safety inspection of the overhead lines.",
    "Four units in the same cluster have been sealed pending inspection. A magisterial inquiry has been ordered, with a report due in fifteen days.",
    "The state government has announced compensation for the families of the deceased. Relief teams remain at the site.",
  ],
  hi: [
    "मंगलवार सुबह ज़िले के बाहरी इलाके में एक पटाखा निर्माण यूनिट में ज़ोरदार धमाके में ग्यारह लोगों की मौत हो गई और कम से कम उन्नीस घायल हुए। धमाके की आवाज़ लगभग तीन किलोमीटर दूर तक सुनी गई।",
    "मलबा पटरियों के पास गिरने से पास के सेक्शन पर ट्रेनें करीब तीन घंटे रोकी गईं। रेलवे अधिकारियों ने बताया कि ओवरहेड लाइनों की सुरक्षा जांच के बाद सेवाएं बहाल हुईं।",
    "उसी क्लस्टर की चार यूनिटों को जांच तक सील कर दिया गया है। मजिस्ट्रेट जांच के आदेश दिए गए हैं, जिसकी रिपोर्ट पंद्रह दिनों में आएगी।",
    "राज्य सरकार ने मृतकों के परिजनों के लिए मुआवज़े का ऐलान किया है। राहत टीमें अब भी मौके पर हैं।",
  ],
};

export function articleCopy(s: Story, lang: Lang) {
  const H = lang === "hi";
  const title = s.title[lang], place = s.place[lang], cat = s.cat[lang];
  const stateLine = H ? "पश्चिम बंगाल, बिहार, झारखंड और उत्तर प्रदेश" : "West Bengal, Bihar, Jharkhand and Uttar Pradesh";

  if (s.lead) {
    return {
      highlights: H
        ? ["पटाखा यूनिट में धमाके से 11 की मौत, 19 घायल", "पास के सेक्शन पर तीन घंटे ट्रेनें रुकीं", "चार यूनिट सील, मजिस्ट्रेट जांच के आदेश"]
        : ["Blast at a firecracker unit leaves 11 dead and 19 injured", "Trains on the adjoining section held for three hours", "Four units sealed; magisterial inquiry ordered"],
      dek: H ? "चार यूनिट सील, भंडारण लाइसेंसों का ऑडिट। तीन घंटे की रोक के बाद पास के सेक्शन पर रेल सेवाएं बहाल।" : "Four units sealed, storage licences under audit. Rail services on the adjoining section resumed after a three-hour halt.",
      body: LEAD_BODY[lang],
      tags: H ? ["उत्तर प्रदेश", "धमाका", "पटाखा फैक्ट्री", "रेलवे", "NDRF"] : ["Uttar Pradesh", "Blast", "Firecracker Unit", "Railways", "NDRF"],
    };
  }

  const summary = s.summary?.[lang];
  const highlights = H
    ? [`${place} से रिपोर्ट, ${s.time.hi}`, `${cat} डेस्क पूरे मामले पर नज़र बनाए हुए है`, "नई जानकारी आने पर खबर अपडेट की जाएगी"]
    : [`Reported from ${place}, ${s.time.en}`, `Our ${cat.toLowerCase()} desk is tracking further developments`, "This story will be updated as details emerge"];
  const body = H
    ? [
        `${title}। ${summary ?? `यह जानकारी मंगलवार, 1 सितंबर 2026 को ${place} से सामने आई।`}`,
        s.video
          ? "इस वीडियो रिपोर्ट में मौके से ताज़ा तस्वीरें और लोगों की प्रतिक्रिया दिखाई गई है। पूरी रिपोर्ट Taaza TV ऐप और लाइव TV पर देखें।"
          : `अधिकारियों ने कहा कि जांच पूरी होने के बाद और जानकारी साझा की जाएगी। हमारी ${cat} टीम संबंधित लोगों के संपर्क में है और हर अपडेट पर नज़र रख रही है।`,
        s.premium
          ? "यह Taaza TV प्रीमियम की विशेष रिपोर्ट है। पूरी कहानी पढ़ने के लिए मेंबर बनें।"
          : `${stateLine} की ताज़ा खबरों के लिए Taaza TV के साथ बने रहें।`,
      ]
    : [
        `${title}. ${summary ?? `The development was reported from ${place} on Tuesday, 1 September 2026.`}`,
        s.video
          ? "This video report brings the latest visuals from the ground along with reactions from people on the spot. Watch the full report on the Taaza TV app and Live TV."
          : `Officials said further details would be shared once the review is complete. Our ${cat.toLowerCase()} team is in touch with the people involved and is following every update.`,
        s.premium
          ? "This is a Taaza TV Premium report. Become a member to read the full story."
          : `Stay with Taaza TV for the latest news from ${stateLine}.`,
      ];
  return {
    highlights,
    dek: summary ?? "",
    body,
    tags: [cat, place, "Taaza TV", H ? "ताज़ा खबर" : "Latest News"],
  };
}

export const STATE_NAME = (s: StateName, lang: Lang) => (lang === "hi" ? STATE_HI[s] : s);
