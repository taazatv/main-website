/**
 * Taaza TV's own events. Each one has a page on this site at /events/<slug>, whose "View more" button
 * opens the event's official site.
 *
 * Sources (check and update each season):
 * - official sites: taazadandiya.com, youngotsav.com, kwizdom.com, medhasamman.taazatv.com
 * - Taaza Dandiya: district.in / insider.in ticket listings for 2023–2026, Outlook India's Navratri 2025 guide
 * - Kwizdom: GRSE coverage of KWIZDOM 2025 (indianmasterminds.com), MCKV's 2023 report
 * - Medha Samman: IEM's 2017 report, Adamas World School's 2025 report, Taaza TV's own 2026 stories
 * - Youngotsav: Bhawanipur Education Society College's 2025 media page
 * Photos are in public/taaza/events/.
 */
type T = { en: string; hi: string };

export type TaazaEvent = {
  slug: string;
  name: string;
  hi: string;
  /** official site; null while an event has none */
  url: string | null;
  /** photo; null shows the Taaza TV logo instead */
  img: string | null;
  tag: T;
  /** one-line summary, used on cards and the Advertise page */
  desc: T;
  /** longer write-up for the event's own page */
  about: T[];
  stats: T[];
  audience: T | null;
  /** key/value rows for the "At a glance" panel */
  facts: { k: T; v: T }[];
  highlights: { t: T; d: T }[];
  timeline: { year: string; t: T }[];
  /** how to attend or take part */
  join: T | null;
  /** where its news comes from: an old-site category and/or title keywords */
  news: { category?: string; keywords: string[] };
};

export const EVENTS: TaazaEvent[] = [
  {
    slug: "taaza-dandiya",
    name: "Taaza Dandiya",
    hi: "ताज़ा डांडिया",
    url: "https://taazadandiya.com/",
    img: "/taaza/events/taaza-dandiya.jpg",
    tag: { en: "Navratri · Kolkata", hi: "नवरात्रि · कोलकाता" },
    desc: {
      en: "Eastern India's largest Dandiya and Garba celebration, with live artists, contests and the biggest dance floor in East India. 2026: 18–20 October at Biswa Bangla Milan Mela Prangan (WBTPO, behind ITC Kolkata).",
      hi: "पूर्वी भारत का सबसे बड़ा डांडिया और गरबा उत्सव: लाइव कलाकार, कॉन्टेस्ट और पूर्वी भारत का सबसे बड़ा डांस फ़्लोर। 2026: 18–20 अक्टूबर, बिस्वा बांग्ला मिलन मेला प्रांगण (WBTPO, ITC कोलकाता के पीछे)।",
    },
    about: [
      {
        en: "Taaza Dandiya is Kolkata's biggest Navratri night out and is billed as the biggest Dandiya of Eastern India. For three nights the city dances to traditional Garba and Dandiya, Bollywood dance and DJ sets, as families, college groups and friends fill one of the largest dance floors in the east.",
        hi: "ताज़ा डांडिया कोलकाता की सबसे बड़ी नवरात्रि शाम है, जिसे पूर्वी भारत का सबसे बड़ा डांडिया कहा जाता है। तीन रातों तक पारंपरिक गरबा और डांडिया, बॉलीवुड डांस और DJ की धुनों पर परिवार, कॉलेज के ग्रुप और दोस्त पूर्वी भारत के सबसे बड़े डांस फ़्लोर पर झूमते हैं।",
      },
      {
        en: "The event is organised by Taaza Infotainment Pvt Ltd, the company behind Taaza TV. Recent editions were held at Netaji Indoor Stadium; the 2026 edition moves to the larger Biswa Bangla Milan Mela Prangan, with indoor (AC) and outdoor areas.",
        hi: "यह आयोजन Taaza TV की कंपनी ताज़ा इन्फ़ोटेनमेंट प्रा. लि. करती है। पिछले कुछ साल यह नेताजी इंडोर स्टेडियम में हुआ; 2026 में यह बड़े बिस्वा बांग्ला मिलन मेला प्रांगण में हो रहा है, जहां इंडोर (AC) और आउटडोर दोनों जगह हैं।",
      },
    ],
    stats: [{ en: "17 years", hi: "17 साल" }, { en: "50,000+ participants a year", hi: "हर साल 50,000+ लोग" }, { en: "3 nights", hi: "3 रातें" }],
    audience: { en: "Families & youth", hi: "परिवार और युवा" },
    facts: [
      { k: { en: "2026 dates", hi: "2026 की तारीख" }, v: { en: "18–20 October", hi: "18–20 अक्टूबर" } },
      { k: { en: "Venue", hi: "जगह" }, v: { en: "Biswa Bangla Milan Mela Prangan (WBTPO), behind ITC Kolkata", hi: "बिस्वा बांग्ला मिलन मेला प्रांगण (WBTPO), ITC कोलकाता के पीछे" } },
      { k: { en: "Tickets", hi: "टिकट" }, v: { en: "From ₹900 on District", hi: "District पर ₹900 से" } },
      { k: { en: "Organiser", hi: "आयोजक" }, v: { en: "Taaza Infotainment Pvt Ltd", hi: "ताज़ा इन्फ़ोटेनमेंट प्रा. लि." } },
    ],
    highlights: [
      { t: { en: "Garba & Dandiya", hi: "गरबा और डांडिया" }, d: { en: "Traditional Navratri dance on a huge floor, all three nights.", hi: "तीनों रात बड़े डांस फ़्लोर पर पारंपरिक नवरात्रि नृत्य।" } },
      { t: { en: "Live band", hi: "लाइव बैंड" }, d: { en: "Keyur-Nayan Mehta, the \"Dandiya Kings\", headlined 2023 and 2024 with a 30-member band.", hi: "“डांडिया किंग्स” केयूर-नयन मेहता ने 2023 और 2024 में 30 कलाकारों के बैंड के साथ परफ़ॉर्म किया।" } },
      { t: { en: "DJ nights", hi: "DJ नाइट्स" }, d: { en: "DJ Akash Rohira has played Taaza Dandiya since its start, with Bolly-dance remixes.", hi: "DJ आकाश रोहिरा शुरुआत से ताज़ा डांडिया में बॉलीवुड रीमिक्स बजाते आ रहे हैं।" } },
      { t: { en: "Contests & prizes", hi: "कॉन्टेस्ट और इनाम" }, d: { en: "Dance contests through the nights, on East India's biggest dance floor.", hi: "पूर्वी भारत के सबसे बड़े डांस फ़्लोर पर हर रात डांस कॉन्टेस्ट।" } },
    ],
    timeline: [
      { year: "2023", t: { en: "Billed as East India's grandest Dandiya, with Keyur-Nayan Mehta and DJ Akash Rohira.", hi: "पूर्वी भारत का सबसे भव्य डांडिया, केयूर-नयन मेहता और DJ आकाश रोहिरा के साथ।" } },
      { year: "2024", t: { en: "15 years celebrated at Netaji Indoor Stadium, 10–12 October.", hi: "नेताजी इंडोर स्टेडियम में 15 साल का जश्न, 10–12 अक्टूबर।" } },
      { year: "2025", t: { en: "16th year at Netaji Indoor Stadium, 29 September–2 October.", hi: "नेताजी इंडोर स्टेडियम में 16वां साल, 29 सितंबर–2 अक्टूबर।" } },
      { year: "2026", t: { en: "Moves to Biswa Bangla Milan Mela Prangan, 18–20 October.", hi: "बिस्वा बांग्ला मिलन मेला प्रांगण में, 18–20 अक्टूबर।" } },
    ],
    join: { en: "Buy passes on the official website or on District. The dance floor is standing-only, with indoor (AC) and outdoor areas.", hi: "पास आधिकारिक वेबसाइट या District से खरीदें। डांस फ़्लोर पर सिर्फ़ खड़े रहने की जगह है, इंडोर (AC) और आउटडोर दोनों।" },
    news: { keywords: ["dandiya", "garba", "navratri", "डांडिया", "गरबा", "नवरात्रि"] },
  },
  {
    slug: "youngotsav",
    name: "Youngotsav",
    hi: "यंगोत्सव",
    url: "https://youngotsav.com/",
    img: "/taaza/events/youngotsav.jpg",
    tag: { en: "Colleges · Youth", hi: "कॉलेज · युवा" },
    desc: {
      en: "East India's biggest college activation: talent hunts, stage shows and interactive brand experiences across campuses, televised on Taaza TV.",
      hi: "पूर्वी भारत का सबसे बड़ा कॉलेज एक्टिवेशन: टैलेंट हंट, स्टेज शो और कैंपस में ब्रांड के साथ मज़ेदार गतिविधियां, Taaza TV पर प्रसारण के साथ।",
    },
    about: [
      {
        en: "Youngotsav, \"Celebrating Youth & Culture\", takes Taaza TV to college campuses across eastern India. Students compete in talent hunts and perform on stage, and the best moments are shown on Taaza TV.",
        hi: "यंगोत्सव, “युवा और संस्कृति का उत्सव”, Taaza TV को पूर्वी भारत के कॉलेज कैंपस तक ले जाता है। छात्र टैलेंट हंट में हिस्सा लेते हैं और मंच पर परफ़ॉर्म करते हैं, और सबसे अच्छे पल Taaza TV पर दिखाए जाते हैं।",
      },
      {
        en: "Each campus stop also brings interactive brand experiences, which is why brands such as Coca-Cola, Royal Enfield, IndianOil and Emami have partnered with it.",
        hi: "हर कैंपस में ब्रांड के साथ मज़ेदार गतिविधियां भी होती हैं, इसीलिए Coca-Cola, Royal Enfield, IndianOil और Emami जैसे ब्रांड इससे जुड़े हैं।",
      },
    ],
    stats: [{ en: "32 top colleges", hi: "32 बड़े कॉलेज" }, { en: "3 lakh+ students", hi: "3 लाख+ छात्र" }, { en: "10 cities", hi: "10 शहर" }],
    audience: { en: "College students", hi: "कॉलेज छात्र" },
    facts: [
      { k: { en: "Where", hi: "कहां" }, v: { en: "College campuses in 10 cities", hi: "10 शहरों के कॉलेज कैंपस" } },
      { k: { en: "Colleges", hi: "कॉलेज" }, v: { en: "32 top colleges", hi: "32 बड़े कॉलेज" } },
      { k: { en: "On TV", hi: "TV पर" }, v: { en: "Televised on Taaza TV", hi: "Taaza TV पर प्रसारण" } },
    ],
    highlights: [
      { t: { en: "Talent hunts", hi: "टैलेंट हंट" }, d: { en: "Talent rounds where students show what they can do.", hi: "टैलेंट राउंड, जहां छात्र अपना हुनर दिखाते हैं।" } },
      { t: { en: "Stage shows", hi: "स्टेज शो" }, d: { en: "Performances on a full event stage at each campus.", hi: "हर कैंपस में बड़े मंच पर परफ़ॉर्मेंस।" } },
      { t: { en: "Brand experiences", hi: "ब्रांड गतिविधियां" }, d: { en: "Games and activities with partner brands.", hi: "पार्टनर ब्रांड्स के साथ गेम और गतिविधियां।" } },
      { t: { en: "On Taaza TV", hi: "Taaza TV पर" }, d: { en: "Campus moments televised to viewers across the east.", hi: "कैंपस के पल पूरे पूर्वी भारत के दर्शकों तक।" } },
    ],
    timeline: [
      { year: "2025", t: { en: "Youngotsav 2025, \"A Celebration of Talent\", with colleges including The Bhawanipur Education Society College.", hi: "यंगोत्सव 2025, “प्रतिभा का उत्सव”, द भवानीपुर एजुकेशन सोसाइटी कॉलेज समेत कई कॉलेजों के साथ।" } },
    ],
    join: { en: "Colleges and students can register through the official website.", hi: "कॉलेज और छात्र आधिकारिक वेबसाइट से रजिस्टर कर सकते हैं।" },
    news: { keywords: ["youngotsav", "young otsav", "यंगोत्सव"] },
  },
  {
    slug: "kwizdom",
    name: "Kwizdom",
    hi: "क्विज़डम",
    url: "https://kwizdom.com/",
    img: "/taaza/events/kwizdom.jpg",
    tag: { en: "Schools · Quiz", hi: "स्कूल · क्विज़" },
    desc: {
      en: "Taaza TV's flagship school quiz on Glorious India, started with GRSE (Ministry of Defence). Every student of a participating class takes it in school.",
      hi: "Taaza TV का प्रमुख स्कूल क्विज़ “Glorious India” पर, GRSE (रक्षा मंत्रालय) के साथ शुरू हुआ। भाग लेने वाली कक्षा का हर छात्र स्कूल में यह क्विज़ देता है।",
    },
    about: [
      {
        en: "Kwizdom is an inter-school quiz contest on Glorious India, run by Taaza TV with Garden Reach Shipbuilders & Engineers (GRSE), a Navratna company of the Ministry of Defence. It began as part of GRSE's India@75 celebrations to build awareness of Atmanirbhar Bharat among students.",
        hi: "क्विज़डम “Glorious India” पर एक इंटर-स्कूल क्विज़ है, जिसे Taaza TV रक्षा मंत्रालय की नवरत्न कंपनी गार्डन रीच शिपबिल्डर्स एंड इंजीनियर्स (GRSE) के साथ आयोजित करता है। इसकी शुरुआत GRSE के India@75 समारोह के तहत छात्रों में आत्मनिर्भर भारत के प्रति जागरूकता के लिए हुई।",
      },
      {
        en: "Every student of a participating class takes the first round in school. The top schools go on to a stage finale in Kolkata, and every participant gets an e-certificate.",
        hi: "भाग लेने वाली कक्षा का हर छात्र पहला राउंड स्कूल में देता है। सबसे अच्छे स्कूल कोलकाता के ग्रैंड फ़िनाले में पहुंचते हैं, और हर प्रतिभागी को ई-सर्टिफ़िकेट मिलता है।",
      },
    ],
    stats: [{ en: "100+ schools", hi: "100+ स्कूल" }, { en: "50,000+ students a year", hi: "हर साल 50,000+ छात्र" }, { en: "With GRSE", hi: "GRSE के साथ" }],
    audience: { en: "Classes VIII–X", hi: "कक्षा 8–10" },
    facts: [
      { k: { en: "Who can take part", hi: "कौन भाग ले सकता है" }, v: { en: "School students, Classes VIII–X", hi: "स्कूल छात्र, कक्षा 8–10" } },
      { k: { en: "Partner", hi: "पार्टनर" }, v: { en: "GRSE, Ministry of Defence", hi: "GRSE, रक्षा मंत्रालय" } },
      { k: { en: "Finale", hi: "फ़िनाले" }, v: { en: "Kala Mandir, Kolkata (2025)", hi: "कला मंदिर, कोलकाता (2025)" } },
      { k: { en: "Current edition", hi: "मौजूदा एडिशन" }, v: { en: "Kwizdom 4.0", hi: "क्विज़डम 4.0" } },
    ],
    highlights: [
      { t: { en: "Quiz on Glorious India", hi: "“Glorious India” पर क्विज़" }, d: { en: "Questions on India's heritage and achievements, and Atmanirbhar Bharat.", hi: "भारत की विरासत, उपलब्धियों और आत्मनिर्भर भारत पर सवाल।" } },
      { t: { en: "Whole class takes part", hi: "पूरी कक्षा भाग लेती है" }, d: { en: "The first round is held inside each school for every student.", hi: "पहला राउंड हर स्कूल में सभी छात्रों के लिए होता है।" } },
      { t: { en: "Stage finale", hi: "ग्रैंड फ़िनाले" }, d: { en: "Top school teams battle it out live on stage in Kolkata.", hi: "टॉप स्कूल टीमें कोलकाता में मंच पर लाइव मुकाबला करती हैं।" } },
      { t: { en: "Certificate for all", hi: "सबको सर्टिफ़िकेट" }, d: { en: "Every participant receives an e-certificate.", hi: "हर प्रतिभागी को ई-सर्टिफ़िकेट मिलता है।" } },
    ],
    timeline: [
      { year: "2023", t: { en: "Launched with GRSE for India@75; MCKV finished second in the finals.", hi: "India@75 के लिए GRSE के साथ शुरुआत; फ़ाइनल में MCKV दूसरे स्थान पर।" } },
      { year: "2025", t: { en: "Finale at Kala Mandir: MP Birla School won, Birla High School and Central Modern School were runners-up. 50,000+ students from 100+ schools took part.", hi: "कला मंदिर में फ़िनाले: एमपी बिड़ला स्कूल विजेता, बिड़ला हाई स्कूल और सेंट्रल मॉडर्न स्कूल उपविजेता। 100+ स्कूलों के 50,000+ छात्रों ने भाग लिया।" } },
    ],
    join: { en: "Schools can sign up through the official website; the first round is then held in school.", hi: "स्कूल आधिकारिक वेबसाइट से जुड़ सकते हैं; फिर पहला राउंड स्कूल में ही होता है।" },
    news: { keywords: ["kwizdom", "क्विज़डम", "grse quiz"] },
  },
  {
    slug: "medha-samman",
    name: "Medha Samman",
    hi: "मेधा सम्मान",
    url: "https://medhasamman.taazatv.com/",
    img: "/taaza/events/medha-samman.jpg",
    tag: { en: "Education · Awards", hi: "शिक्षा · सम्मान" },
    desc: {
      en: "One of Eastern India's most prestigious academic awards, honouring Class 10 and 12 toppers from leading schools since 2011. Held in Kolkata, with Durgapur, Siliguri, Ranchi and Patna coming soon.",
      hi: "पूर्वी भारत के सबसे प्रतिष्ठित शैक्षणिक सम्मानों में से एक, 2011 से प्रमुख स्कूलों के कक्षा 10 और 12 के टॉपर्स का सम्मान। कोलकाता में आयोजन, दुर्गापुर, सिलीगुड़ी, रांची और पटना जल्द।",
    },
    about: [
      {
        en: "Medha Samman is Taaza TV's award for school toppers. Every year since 2011 it brings Class 10 and Class 12 toppers from leading schools on stage with their parents and teachers, and the ceremony is broadcast on Taaza TV.",
        hi: "मेधा सम्मान स्कूल टॉपर्स के लिए Taaza TV का सम्मान है। 2011 से हर साल यह प्रमुख स्कूलों के कक्षा 10 और 12 के टॉपर्स को उनके माता-पिता और शिक्षकों के साथ मंच पर सम्मानित करता है, और समारोह Taaza TV पर प्रसारित होता है।",
      },
      {
        en: "In 2026 it honoured 2,200 Class 12 toppers from 111 schools across Greater Kolkata, followed by a separate Class 10 ceremony on 11 July.",
        hi: "2026 में इसने ग्रेटर कोलकाता के 111 स्कूलों के 2,200 कक्षा 12 टॉपर्स को सम्मानित किया, और 11 जुलाई को कक्षा 10 का अलग समारोह हुआ।",
      },
    ],
    stats: [{ en: "Since 2011", hi: "2011 से" }, { en: "111 schools in 2026", hi: "2026 में 111 स्कूल" }, { en: "20,000+ toppers honoured", hi: "20,000+ टॉपर्स सम्मानित" }],
    audience: { en: "Students & parents", hi: "छात्र और अभिभावक" },
    facts: [
      { k: { en: "Who is honoured", hi: "किसका सम्मान" }, v: { en: "Class 10 and 12 toppers", hi: "कक्षा 10 और 12 के टॉपर्स" } },
      { k: { en: "2026", hi: "2026" }, v: { en: "2,200 Class 12 toppers, 111 schools", hi: "2,200 कक्षा 12 टॉपर्स, 111 स्कूल" } },
      { k: { en: "Class 10 ceremony", hi: "कक्षा 10 समारोह" }, v: { en: "11 July 2026", hi: "11 जुलाई 2026" } },
      { k: { en: "Cities", hi: "शहर" }, v: { en: "Kolkata; Durgapur, Siliguri, Ranchi, Patna soon", hi: "कोलकाता; दुर्गापुर, सिलीगुड़ी, रांची, पटना जल्द" } },
    ],
    highlights: [
      { t: { en: "Toppers on stage", hi: "मंच पर टॉपर्स" }, d: { en: "Each topper is called on stage and felicitated.", hi: "हर टॉपर को मंच पर बुलाकर सम्मानित किया जाता है।" } },
      { t: { en: "Leading schools", hi: "प्रमुख स्कूल" }, d: { en: "Toppers come from 111 leading schools across Greater Kolkata.", hi: "ग्रेटर कोलकाता के 111 प्रमुख स्कूलों के टॉपर्स।" } },
      { t: { en: "On Taaza TV", hi: "Taaza TV पर" }, d: { en: "The ceremony is broadcast on the channel.", hi: "समारोह चैनल पर प्रसारित होता है।" } },
      { t: { en: "Photos to download", hi: "फ़ोटो डाउनलोड" }, d: { en: "Families can download ceremony photos afterwards.", hi: "परिवार बाद में समारोह की फ़ोटो डाउनलोड कर सकते हैं।" } },
    ],
    timeline: [
      { year: "2011", t: { en: "First Medha Samman.", hi: "पहला मेधा सम्मान।" } },
      { year: "2017", t: { en: "Class 12 merit-list toppers honoured at Gorky Sadan, Kolkata, with the UEM-IEM group.", hi: "गोर्की सदन, कोलकाता में UEM-IEM ग्रुप के साथ कक्षा 12 मेरिट लिस्ट टॉपर्स का सम्मान।" } },
      { year: "2026", t: { en: "2,200 Class 12 toppers from 111 schools; Class 10 ceremony on 11 July.", hi: "111 स्कूलों के 2,200 कक्षा 12 टॉपर्स; 11 जुलाई को कक्षा 10 समारोह।" } },
    ],
    join: { en: "The toppers list for each ceremony is announced on the official website and in Taaza TV news.", hi: "हर समारोह के टॉपर्स की लिस्ट आधिकारिक वेबसाइट और Taaza TV न्यूज़ पर जारी होती है।" },
    news: { category: "medha-samman-2026", keywords: ["medha samman", "मेधा सम्मान"] },
  },
  {
    slug: "winter-carnival",
    name: "Winter Carnival",
    hi: "विंटर कार्निवल",
    url: null,
    img: null,
    tag: { en: "Winter · Coming soon", hi: "सर्दी · जल्द" },
    desc: {
      en: "Taaza TV's winter celebration. Dates, venue and details for this season will be announced soon on Taaza TV and this website.",
      hi: "Taaza TV का सर्दियों का उत्सव। इस सीज़न की तारीख, जगह और बाकी जानकारी जल्द ही Taaza TV और इस वेबसाइट पर बताई जाएगी।",
    },
    about: [],
    stats: [],
    audience: null,
    facts: [],
    highlights: [],
    timeline: [],
    join: null,
    news: { keywords: ["winter carnival", "विंटर कार्निवल"] },
  },
];

export const eventBySlug = (slug: string) => EVENTS.find((e) => e.slug === slug);
