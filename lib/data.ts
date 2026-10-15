export type Lang = "en" | "hi";
export type StateName = "West Bengal" | "Bihar" | "Jharkhand" | "Uttar Pradesh";

export const STATES: StateName[] = ["West Bengal", "Bihar", "Jharkhand", "Uttar Pradesh"];
export const STATE_SHORT: Record<StateName, string> = { "West Bengal": "WB", Bihar: "BR", Jharkhand: "JH", "Uttar Pradesh": "UP" };
export const STATE_HI: Record<StateName, string> = { "West Bengal": "पश्चिम बंगाल", Bihar: "बिहार", Jharkhand: "झारखंड", "Uttar Pradesh": "उत्तर प्रदेश" };

const pic = (seed: string, i: number, dims: string) => `https://picsum.photos/seed/${seed}${i + 1}/${dims}`;

/* ---------------- UI dictionary ---------------- */
export const en = {
  date: "Tuesday, 1 September 2026", yourState: "Your state:", notifications: "Notifications",
  saved: "Saved News", citizen: "Citizen Journalist", signIn: "SIGN IN", follow: "FOLLOW US", search: "Search news…",
  liveTv: "LIVE TV", tagline: "News in your language, from your state", breaking: "BREAKING NEWS",
  topStory: "TOP STORY", latest: "Latest Updates",
  viewMore: "View More", watchLive: "WATCH LIVE", mostWatched: "MOST WATCHED",
  stateNews: "State News", fromYourState: "FROM YOUR STATE", nationalNews: "NATIONAL NEWS",
  worldNews: "INTERNATIONAL NEWS", videoNews: "VIDEO NEWS", entNews: "ENTERTAINMENT NEWS",
  sportsNews: "SPORTS NEWS", healthNews: "HEALTH NEWS", premiumNews: "PREMIUM NEWS",
  membersOnly: "MEMBERS ONLY", becomeMember: "Become a member →", loginToRead: "LOGIN TO READ",
  cjKicker: "CITIZEN JOURNALIST",
  cjTitle: "Send us the news from your neighbourhood — we verify it, then publish it.",
  cjBody: "Upload your story with pictures and video. Once our desk confirms the details, it goes live with your credit.",
  cjCta: "Upload your story", appKicker: "MOBILE APP",
  appTitle: "Download the Taaza TV app to stay updated on the latest news",
  category: "CATEGORY", sortLatest: "Latest", sortRead: "Most Read", sortVideo: "Videos",
  moreInSection: "More in this section", home: "Home", share: "Share", save: "Save",
  liveUpdates: "Live Updates", alsoRead: "Also Read", atAGlance: "AT A GLANCE",
  alertsTitle: "Taaza TV Alerts", alertsBody: "Get breaking news on WhatsApp, the moment it happens.",
  joinNow: "Join now", onAir: "ON AIR NOW", schedule: "Today's Schedule",
  videoHub: "Videos & Shorts", tabShorts: "Shorts", tabBulletins: "Bulletins", tabDebates: "Debates",
  footerTagline: "A national Hindi and English news channel from eastern India. News in your language, from your state.",
  popularCats: "POPULAR CATEGORIES", more: "MORE", quickLinks: "QUICK LINKS", group: "GROUP OF COMPANIES",
  leadKicker: "NATIONAL · UTTAR PRADESH • 12 MIN AGO",
  leadTitle: "Firecracker unit blast in eastern UP leaves 11 dead; trains halted on nearby tracks",
  leadBody: "NDRF teams reached the site within an hour. District administration has ordered an audit of storage licences across the block; four units sealed so far.",
  subA: "STATE", subATitle: "Kolkata police rescue six-month-old from Gariahat in midnight operation",
  subAMeta: "28 min ago", subBMeta: "51 min ago",
  subB: "NATIONAL", subBTitle: "Food-delivery platform bans analogue dairy dishes, warns partner restaurants",
  liveShow: "Prime Debate: poll panel's new Kolkata postings",
  natLead: "Over 1.6 lakh affected across 15 Assam districts as floodwaters submerge farmland",
  ticker: "Firecracker unit blast in eastern UP leaves 11 dead, trains halted  •  Sealdah station fire: officials flag water-supply gaps  •  Kolkata police rescue infant from Gariahat in midnight operation  •  14th JPSC prelims cancelled after Ranchi talks  •  Duleep Trophy: teen opener breaks 57-year-old record  •  ",
  chooseState: "Choose your state",
  getItOn: "Get it on", downloadOnThe: "Download on the",
};
type Dict = typeof en;

export const hi: Dict = {
  date: "मंगलवार, 1 सितंबर 2026", yourState: "आपका राज्य:", notifications: "सूचनाएं",
  saved: "सेव्ड न्यूज़", citizen: "सिटिजन जर्नलिस्ट", signIn: "साइन इन", follow: "फॉलो करें", search: "खबर खोजें…",
  liveTv: "लाइव TV", tagline: "आपकी भाषा में, आपके राज्य की खबर", breaking: "ब्रेकिंग न्यूज़",
  topStory: "बड़ी खबर", latest: "ताज़ा अपडेट",
  viewMore: "और देखें", watchLive: "लाइव देखें", mostWatched: "सबसे ज़्यादा देखे गए",
  stateNews: "राज्य की खबरें", fromYourState: "आपके राज्य से", nationalNews: "देश",
  worldNews: "दुनिया", videoNews: "वीडियो", entNews: "मनोरंजन",
  sportsNews: "खेल", healthNews: "हेल्थ", premiumNews: "प्रीमियम",
  membersOnly: "सिर्फ़ मेंबर्स के लिए", becomeMember: "मेंबर बनें →", loginToRead: "पढ़ने के लिए लॉगिन करें",
  cjKicker: "सिटिजन जर्नलिस्ट",
  cjTitle: "आपके इलाके की खबर आप भेजिए — हम पुष्टि करके छापेंगे।",
  cjBody: "फोटो और वीडियो के साथ खबर अपलोड करें। हमारी टीम पुष्टि के बाद उसे आपके नाम के साथ पब्लिश करेगी।",
  cjCta: "खबर भेजें", appKicker: "मोबाइल ऐप",
  appTitle: "हर ब्रेकिंग खबर के लिए Taaza TV ऐप डाउनलोड करें",
  category: "सेक्शन", sortLatest: "ताज़ा", sortRead: "सबसे पढ़ी", sortVideo: "वीडियो",
  moreInSection: "इस सेक्शन में और", home: "होम", share: "शेयर", save: "सेव",
  liveUpdates: "लाइव अपडेट्स", alsoRead: "ये भी पढ़ें", atAGlance: "एक नज़र में",
  alertsTitle: "Taaza TV अलर्ट", alertsBody: "ब्रेकिंग न्यूज़ सीधे WhatsApp पर पाएं।",
  joinNow: "जॉइन करें", onAir: "अभी चल रहा है", schedule: "आज का शेड्यूल",
  videoHub: "वीडियो और शॉर्ट्स", tabShorts: "शॉर्ट्स", tabBulletins: "बुलेटिन", tabDebates: "डिबेट",
  footerTagline: "पूर्वी भारत से हिंदी और अंग्रेज़ी न्यूज़ चैनल। आपकी भाषा में, आपके राज्य की खबर।",
  popularCats: "लोकप्रिय सेक्शन", more: "और", quickLinks: "क्विक लिंक", group: "ग्रुप ऑफ कंपनीज़",
  leadKicker: "देश · उत्तर प्रदेश • 12 मिनट पहले",
  leadTitle: "पूर्वी UP में पटाखा फैक्ट्री में धमाका, 11 की मौत; ट्रैक पर ट्रेनें रोकी गईं",
  leadBody: "NDRF की टीम एक घंटे में मौके पर पहुंची। जिला प्रशासन ने पूरे ब्लॉक में स्टोरेज लाइसेंस की जांच का आदेश दिया; अब तक चार यूनिट सील।",
  subA: "राज्य", subATitle: "गरियाहाट से 6 महीने का बच्चा बरामद, आधी रात चला ऑपरेशन",
  subAMeta: "28 मिनट पहले", subBMeta: "51 मिनट पहले",
  subB: "देश", subBTitle: "फूड डिलीवरी प्लेटफॉर्म ने एनालॉग डेयरी डिश बैन कीं, पार्टनर्स को चेतावनी",
  liveShow: "हल्ला बोल: कोलकाता पुलिस में नई तैनाती",
  natLead: "असम के 15 जिलों में 1.6 लाख से ज़्यादा प्रभावित, खेत जलमग्न",
  ticker: "पूर्वी UP में पटाखा फैक्ट्री में धमाका, 11 की मौत  •  सियालदह स्टेशन आग: पानी की कमी पर सवाल  •  गरियाहाट से 6 महीने का बच्चा बरामद  •  14वीं JPSC प्रारंभिक परीक्षा रद्द  •  दुलीप ट्रॉफी: युवा ओपनर ने 57 साल का रिकॉर्ड तोड़ा  •  ",
  chooseState: "अपना राज्य चुनें",
  getItOn: "Get it on", downloadOnThe: "Download on the",
};

export const dict = (lang: Lang): Dict => (lang === "hi" ? hi : en);

/* ---------------- Navigation ---------------- */
export type NavLeaf = { label: string; hi: string; href: string };
export type NavItem = NavLeaf | { label: string; hi: string; group: NavLeaf[] };

export const CATEGORIES: Record<string, { en: string; hi: string }> = {
  "medha-samman-2026": { en: "Medha Samman 2026", hi: "मेधा सम्मान 2026" },
  "election-2026": { en: "Election 2026", hi: "चुनाव 2026" },
  premium: { en: "Premium", hi: "प्रीमियम" },
  national: { en: "National", hi: "देश" },
  entertainment: { en: "Entertainment", hi: "मनोरंजन" },
  state: { en: "State", hi: "राज्य" },
  "international-news": { en: "International News", hi: "दुनिया" },
  sports: { en: "Sports", hi: "खेल" },
  health: { en: "Health", hi: "हेल्थ" },
};

export const NAV: NavItem[] = [
  { label: "Home", hi: "होम", href: "/" },
  {
    label: "Events", hi: "इवेंट्स", group: [
      { label: "Medha Samman 2026", hi: "मेधा सम्मान 2026", href: "/category/medha-samman-2026" },
      { label: "Taaza Dandiya 2026", hi: "ताज़ा डांडिया 2026", href: "/category/medha-samman-2026" },
    ],
  },
  { label: "Election", hi: "चुनाव", href: "/category/election-2026" },
  { label: "Premium", hi: "प्रीमियम", href: "/category/premium" },
  { label: "National", hi: "देश", href: "/category/national" },
  { label: "State", hi: "राज्य", href: "/category/state" },
  {
    label: "More", hi: "और", group: [
      { label: "Entertainment", hi: "मनोरंजन", href: "/category/entertainment" },
      { label: "Sports", hi: "खेल", href: "/category/sports" },
      { label: "Health", hi: "हेल्थ", href: "/category/health" },
      { label: "World", hi: "दुनिया", href: "/category/international-news" },
    ],
  },
  { label: "Video", hi: "वीडियो", href: "/video" },
  { label: "Live TV", hi: "लाइव TV", href: "/live-tv" },
];

/* ---------------- State editions ---------------- */
type Edition = { lead: { kicker: string; title: string; meta: string }; list: string[] };

export const stateEn: Record<StateName, Edition> = {
  "West Bengal": {
    lead: { kicker: "KOLKATA", title: "Kolkata police rescue six-month-old from Gariahat in midnight operation", meta: "Kolkata • 34 min ago" },
    list: [
      "Sealdah station fire: officials flag lack of adequate water supply",
      "Graffiti erased from university walls after chief minister's warning",
      "Sergeant and constable suspended over extortion complaint",
      "Fresh posters surface in Salt Lake, political row deepens",
      "Airport flags laser-light interference during night landings",
      "Poll panel makes new appointments in Kolkata police",
    ],
  },
  Bihar: {
    lead: { kicker: "PATNA", title: "Mob torches bus and three police vehicles in Patna after pedestrian killed", meta: "Patna • 1 hour ago" },
    list: [
      "Passengers trapped between trains at Barhiya station; video goes viral",
      "Over 100 rounds fired in land feud in Begusarai, four injured",
      "State to withdraw cases against exam protesters",
      "Siwan cop suspended for firing rifle while chasing protesters",
      "Bridge collapse strands over 30,000 residents in Muzaffarpur",
      "Kishanganj police seize contraband worth ₹7.7 crore",
    ],
  },
  Jharkhand: {
    lead: { kicker: "RANCHI", title: "Partial consensus in Ranchi: 14th JPSC prelims cancelled, three officials resign", meta: "Ranchi • 2 hours ago" },
    list: [
      "JPSC row: student leader vows to continue hunger strike",
      "Top Maoist leader with ₹1 crore bounty arrested",
      "16 Maoists with cumulative ₹39 lakh bounty lay down arms",
      "ED raids 25 locations in Dhanbad over illegal coal transport",
      "Tobacco smuggling network busted in Pakur",
      "Police driver critically injured in Ranchi hit-and-run",
    ],
  },
  "Uttar Pradesh": {
    lead: { kicker: "UTTAR PRADESH", title: "Firecracker unit blast leaves 11 dead; trains halted on nearby tracks", meta: "Lucknow • 22 min ago" },
    list: [
      "Student who hacked institute website after rejection gets a second chance",
      "Alliance offer for 2027 polls sets off fresh political sparring",
      "Bank to manage temple donations after theft scandal",
      "High court judge makes sharp remarks in corruption hearing",
      "Trainee pilot injured by propeller at Kanpur airport",
      "14 dead as fire engulfs commercial building in Lucknow",
    ],
  },
};

export const stateHi: Record<StateName, Edition> = {
  "West Bengal": {
    lead: { kicker: "कोलकाता", title: "गरियाहाट से 6 महीने का बच्चा बरामद, आधी रात चला ऑपरेशन", meta: "कोलकाता • 34 मिनट पहले" },
    list: [
      "सियालदह स्टेशन आग: अधिकारियों ने पानी की कमी बताई",
      "मुख्यमंत्री की चेतावनी के बाद यूनिवर्सिटी की दीवारों से ग्रैफिटी हटाई गई",
      "वसूली की शिकायत पर सार्जेंट और कांस्टेबल सस्पेंड",
      "साल्ट लेक में नए पोस्टर, सियासी विवाद गहराया",
      "एयरपोर्ट ने रात की लैंडिंग में लेज़र लाइट की दिक्कत बताई",
      "चुनाव आयोग ने कोलकाता पुलिस में नई तैनाती की",
    ],
  },
  Bihar: {
    lead: { kicker: "पटना", title: "पटना में राहगीर की मौत के बाद बस और तीन पुलिस गाड़ियां फूंकी गईं", meta: "पटना • 1 घंटा पहले" },
    list: [
      "बड़हिया स्टेशन पर दो ट्रेनों के बीच फंसे यात्री, वीडियो वायरल",
      "बेगूसराय में ज़मीन विवाद पर 100 से ज़्यादा राउंड फायरिंग, चार घायल",
      "परीक्षा प्रदर्शनकारियों पर से केस वापस लेगी सरकार",
      "प्रदर्शनकारियों का पीछा करते हुए राइफल चलाने पर सिवान का दारोगा सस्पेंड",
      "मुजफ्फरपुर में पुल टूटा, 30 हजार से ज़्यादा लोग प्रभावित",
      "किशनगंज पुलिस ने 7.7 करोड़ का प्रतिबंधित सामान पकड़ा",
    ],
  },
  Jharkhand: {
    lead: { kicker: "रांची", title: "रांची में आंशिक सहमति: 14वीं JPSC प्रारंभिक परीक्षा रद्द, तीन अधिकारियों का इस्तीफा", meta: "रांची • 2 घंटे पहले" },
    list: [
      "JPSC विवाद: छात्र नेता ने अनशन जारी रखने का ऐलान किया",
      "एक करोड़ के इनामी शीर्ष माओवादी नेता की गिरफ्तारी",
      "39 लाख के कुल इनाम वाले 16 माओवादियों ने हथियार डाले",
      "अवैध कोयला ढुलाई मामले में धनबाद में ED की 25 जगह छापेमारी",
      "पाकुड़ में तंबाकू तस्करी का नेटवर्क पकड़ा गया",
      "रांची हिट-एंड-रन में पुलिस ड्राइवर गंभीर रूप से घायल",
    ],
  },
  "Uttar Pradesh": {
    lead: { kicker: "उत्तर प्रदेश", title: "पटाखा फैक्ट्री में धमाका, 11 की मौत; नज़दीकी ट्रैक पर ट्रेनें रोकी गईं", meta: "लखनऊ • 22 मिनट पहले" },
    list: [
      "रिजेक्शन के बाद संस्थान की वेबसाइट हैक करने वाले छात्र को दूसरा मौका",
      "2027 चुनाव के लिए गठबंधन की पेशकश से सियासी हलचल",
      "चोरी के बाद मंदिर का चंदा अब बैंक संभालेगा",
      "भ्रष्टाचार की सुनवाई में हाईकोर्ट की सख्त टिप्पणी",
      "कानपुर एयरपोर्ट पर प्रोपेलर से ट्रेनी पायलट घायल",
      "लखनऊ में कमर्शियल बिल्डिंग में आग, 14 की मौत",
    ],
  },
};

export const edition = (lang: Lang, s: StateName) => (lang === "hi" ? stateHi[s] : stateEn[s]);

/* ---------------- Category leads ---------------- */
export const leadsEn: Record<string, { title: string; desc: string }> = {
  State: { title: "Kolkata police rescue six-month-old from Gariahat in midnight operation", desc: "Three teams searched for six hours before the infant was traced. Two people are in custody." },
  National: { title: "Over 1.6 lakh affected across 15 Assam districts as floodwaters submerge farmland", desc: "Relief camps have opened in 40 locations. The state has sought additional central assistance." },
  "International News": { title: "Tariff cut of four points announced; Indian textile exporters see relief", desc: "Industry bodies estimate an annual impact of about $1.2 billion on shipments." },
  Sports: { title: "Teen opener shatters 57-year-old record as youngest half-centurion in Duleep Trophy", desc: "The knock came off 31 balls on a green top, with nine boundaries and two sixes." },
  Entertainment: { title: "New release tops the box office with ₹42 crore on opening day", desc: "Multiplex occupancy stood at 78%. Trade analysts have revised weekend projections upward." },
  Health: { title: "India approves first dengue vaccine for the 4–60 age group", desc: "The rollout begins in government hospitals across six states in the first phase." },
  Premium: { title: "Project UDAAN: inside a college programme reshaping rural women's employment", desc: "A six-month reporting project across four districts. Members only." },
  "Election 2026": { title: "Poll panel announces phased schedule; counting set for the last week of April", desc: "Seat-wise notifications follow next week. The model code of conduct is in force." },
  "Medha Samman 2026": { title: "Medha Samman 2026: nominations open for eastern India's student achievers", desc: "Entries close on 30 September. Winners are felicitated at a ceremony in Kolkata." },
};
export const leadsHi: Record<string, { title: string; desc: string }> = {
  State: { title: "गरियाहाट से 6 महीने का बच्चा बरामद, आधी रात चला ऑपरेशन", desc: "तीन टीमों ने छह घंटे तक तलाश की। दो लोग हिरासत में हैं।" },
  National: { title: "असम के 15 जिलों में 1.6 लाख से ज़्यादा प्रभावित, खेत जलमग्न", desc: "40 जगहों पर राहत शिविर खुले। राज्य ने अतिरिक्त केंद्रीय मदद मांगी है।" },
  "International News": { title: "चार अंकों की टैरिफ कटौती, भारतीय टेक्सटाइल एक्सपोर्टर्स को राहत", desc: "इंडस्ट्री का अनुमान — शिपमेंट पर सालाना करीब 1.2 अरब डॉलर का असर।" },
  Sports: { title: "युवा ओपनर ने दुलीप ट्रॉफी में सबसे कम उम्र के अर्धशतक का 57 साल पुराना रिकॉर्ड तोड़ा", desc: "ग्रीन टॉप पर 31 गेंदों की पारी, नौ चौके और दो छक्के।" },
  Entertainment: { title: "नई रिलीज़ ने पहले दिन 42 करोड़ के साथ बॉक्स ऑफिस पर कब्ज़ा किया", desc: "मल्टीप्लेक्स ऑक्यूपेंसी 78% रही। ट्रेड एनालिस्ट्स ने वीकेंड का अनुमान बढ़ाया।" },
  Health: { title: "भारत ने 4 से 60 उम्र वर्ग के लिए पहली डेंगू वैक्सीन को मंजूरी दी", desc: "पहले चरण में छह राज्यों के सरकारी अस्पतालों में रोलआउट शुरू होगा।" },
  Premium: { title: "प्रोजेक्ट उड़ान: ग्रामीण महिलाओं के रोज़गार को बदल रहे कॉलेज प्रोग्राम की कहानी", desc: "चार जिलों में छह महीने की रिपोर्टिंग। सिर्फ़ मेंबर्स के लिए।" },
  "Election 2026": { title: "चुनाव आयोग ने चरणबद्ध कार्यक्रम घोषित किया; अप्रैल के आखिरी हफ्ते मतगणना", desc: "सीटवार अधिसूचना अगले हफ्ते। आदर्श आचार संहिता लागू है।" },
  "Medha Samman 2026": { title: "मेधा सम्मान 2026: पूर्वी भारत के छात्र प्रतिभाओं के लिए नामांकन शुरू", desc: "प्रवेश 30 सितंबर तक। विजेताओं को कोलकाता में सम्मानित किया जाएगा।" },
};
export const categoryLead = (lang: Lang, cat: string) =>
  (lang === "hi" ? leadsHi[cat] : leadsEn[cat]) ?? { title: "Latest from this section", desc: "The section's lead report appears here." };

/* ---------------- Content ---------------- */
export function content(lang: Lang) {
  const H = lang === "hi";
  const pick = <T,>(e: T, h: T) => (H ? h : e);
  return {
    topStories: pick(
      [
        { n: "1", title: "Sealdah station fire: officials flag lack of adequate water supply", meta: "State • 8 min ago" },
        { n: "2", title: "Food-delivery platform bans analogue dairy dishes, warns partners", meta: "National • 22 min ago" },
        { n: "3", title: "Teen opener breaks 57-year-old Duleep Trophy record", meta: "Sports • 40 min ago" },
        { n: "4", title: "14th JPSC prelims cancelled after partial consensus in Ranchi", meta: "State • 1 hour ago" },
        { n: "5", title: "Tariff cut announced; Indian textile exporters see relief", meta: "International • 1 hour ago" },
        { n: "6", title: "Trainer aircraft skids off runway near Baramati; both flyers safe", meta: "National • 2 hours ago" },
        { n: "7", title: "Neighbour seeks additional diesel supplies via cross-border pipeline", meta: "International • 2 hours ago" },
      ],
      [
        { n: "1", title: "सियालदह स्टेशन आग: अधिकारियों ने पानी की कमी बताई", meta: "राज्य • 8 मिनट पहले" },
        { n: "2", title: "फूड डिलीवरी प्लेटफॉर्म ने एनालॉग डेयरी डिश बैन कीं", meta: "देश • 22 मिनट पहले" },
        { n: "3", title: "युवा ओपनर ने दुलीप ट्रॉफी का 57 साल पुराना रिकॉर्ड तोड़ा", meta: "खेल • 40 मिनट पहले" },
        { n: "4", title: "रांची में सहमति के बाद 14वीं JPSC प्रारंभिक परीक्षा रद्द", meta: "राज्य • 1 घंटा पहले" },
        { n: "5", title: "टैरिफ में कटौती, भारतीय टेक्सटाइल एक्सपोर्टर्स को राहत", meta: "दुनिया • 1 घंटा पहले" },
        { n: "6", title: "बारामती के पास ट्रेनर विमान रनवे से फिसला, दोनों सुरक्षित", meta: "देश • 2 घंटे पहले" },
        { n: "7", title: "पड़ोसी देश ने पाइपलाइन से अतिरिक्त डीज़ल की मांग की", meta: "दुनिया • 2 घंटे पहले" },
      ],
    ),
    topVideos: pick(
      ["Poll panel makes new appointments for Kolkata police", "Gas crisis hits community kitchens in the city", "Bengal gets a new governor: what changes", "Protests in central Kolkata: the full picture", "Temperatures climb across West Bengal"],
      ["कोलकाता पुलिस में चुनाव आयोग की नई तैनाती", "शहर की सामुदायिक रसोई पर गैस संकट का असर", "बंगाल को नया राज्यपाल: क्या बदलेगा", "मध्य कोलकाता में प्रदर्शन: पूरी तस्वीर", "पश्चिम बंगाल में चढ़ता तापमान"],
    ).map((title, i) => ({ title, img: pic("mw", i, "400/300") })),
    national: pick(
      ["Trainer aircraft skids off runway near Baramati airfield, both flyers safe", "Over 450 graduating students oppose convocation chief-guest invitation", "Three-day strike by transport unions to hit inter-state routes from Thursday"],
      ["बारामती एयरफील्ड के पास ट्रेनर विमान रनवे से फिसला, दोनों पायलट सुरक्षित", "450 से ज़्यादा छात्रों ने दीक्षांत समारोह के मुख्य अतिथि पर आपत्ति जताई", "ट्रांसपोर्ट यूनियनों की तीन दिन की हड़ताल, गुरुवार से अंतरराज्यीय रूट प्रभावित"],
    ),
    worldCards: pick(
      [
        { kicker: "TRADE", title: "Tariff cut of four points clears the way for textile shipments", meta: "45 min ago" },
        { kicker: "ENERGY", title: "Emergency talks on gas prices end without agreement", meta: "1 hour ago" },
        { kicker: "NEIGHBOURHOOD", title: "Lender's new conditions force a mid-year budget rework", meta: "2 hours ago" },
        { kicker: "MARKETS", title: "Manufacturing index slips to a three-month low", meta: "3 hours ago" },
      ],
      [
        { kicker: "व्यापार", title: "चार अंकों की टैरिफ कटौती से टेक्सटाइल शिपमेंट को राह", meta: "45 मिनट पहले" },
        { kicker: "ऊर्जा", title: "गैस कीमतों पर आपात बैठक बेनतीजा खत्म", meta: "1 घंटा पहले" },
        { kicker: "पड़ोस", title: "कर्ज़दाता की नई शर्तों से बजट में बदलाव मजबूरी", meta: "2 घंटे पहले" },
        { kicker: "बाज़ार", title: "मैन्युफैक्चरिंग इंडेक्स तीन महीने के निचले स्तर पर", meta: "3 घंटे पहले" },
      ],
    ).map((o, i) => ({ ...o, img: pic("world", i, "700/440") })),
    entertainment: pick(
      [
        { title: "New release tops the box office with ₹42 crore on day one", meta: "Entertainment • 30 min ago" },
        { title: "Streaming platform announces four Bengali originals for the season", meta: "Entertainment • 1 hour ago" },
        { title: "Veteran playback singer honoured at the state music awards", meta: "Entertainment • 2 hours ago" },
      ],
      [
        { title: "नई रिलीज़ ने पहले दिन 42 करोड़ के साथ बॉक्स ऑफिस पर कब्ज़ा किया", meta: "मनोरंजन • 30 मिनट पहले" },
        { title: "स्ट्रीमिंग प्लेटफॉर्म ने इस सीज़न चार बंगाली ओरिजिनल्स का ऐलान किया", meta: "मनोरंजन • 1 घंटा पहले" },
        { title: "राज्य संगीत पुरस्कारों में दिग्गज पार्श्व गायक सम्मानित", meta: "मनोरंजन • 2 घंटे पहले" },
      ],
    ).map((o, i) => ({ ...o, img: pic("ent", i, "600/450") })),
    sports: pick(
      ["Teen opener shatters 57-year-old record as youngest half-centurion in Duleep Trophy", "Squad for the limited-overs series to be announced tomorrow", "East Bengal edge past Mohun Bagan in a five-goal derby", "Domestic season schedule released; Kolkata to host the opener"],
      ["युवा ओपनर ने दुलीप ट्रॉफी में सबसे कम उम्र के अर्धशतक का 57 साल पुराना रिकॉर्ड तोड़ा", "सीमित ओवरों की सीरीज़ के लिए टीम का ऐलान कल", "पांच गोल वाले डर्बी में ईस्ट बंगाल ने मोहन बागान को हराया", "घरेलू सीज़न का शेड्यूल जारी, पहला मैच कोलकाता में"],
    ).map((title, i) => ({ title, img: pic("sport", i, "600/450") })),
    subCats: pick(["Cricket", "Football", "Hockey", "Tennis"], ["क्रिकेट", "फुटबॉल", "हॉकी", "टेनिस"]).map((label, i) => ({ label, img: pic("disc", i, "800/450") })),
    health: pick(
      ["India approves first dengue vaccine for the 4–60 age group", "OPD timings revised at government hospitals in Kolkata", "Weight-loss drug set to get cheaper as patent lapses", "Diarrhoea cases up 30% this monsoon; advisory issued"],
      ["भारत ने 4 से 60 उम्र वर्ग के लिए पहली डेंगू वैक्सीन को मंजूरी दी", "कोलकाता के सरकारी अस्पतालों में OPD का समय बदला", "पेटेंट खत्म होने से वज़न घटाने की दवा सस्ती होगी", "इस मानसून डायरिया के मामले 30% बढ़े; एडवाइजरी जारी"],
    ).map((title, i) => ({ title, img: pic("health", i, "600/450") })),
    premium: pick(
      [
        { title: "Inside a college programme reshaping rural women's employment", meta: "Investigation • 8 min read" },
        { title: "Tea garden wages: what actually changed on the ground", meta: "Ground report • 11 min read" },
        { title: "Election 2026: the seat maths, in data", meta: "Data • 6 min read" },
        { title: "Water lines of 12 city wards, ward by ward", meta: "Investigation • 9 min read" },
      ],
      [
        { title: "ग्रामीण महिलाओं के रोज़गार को बदल रहे कॉलेज प्रोग्राम की अंदरूनी कहानी", meta: "इन्वेस्टिगेशन • 8 मिनट रीड" },
        { title: "चाय बागान मज़दूरी: ज़मीन पर असल में क्या बदला", meta: "ग्राउंड रिपोर्ट • 11 मिनट रीड" },
        { title: "चुनाव 2026: सीटों का गणित, आंकड़ों में", meta: "डेटा • 6 मिनट रीड" },
        { title: "शहर के 12 वार्डों की पानी की लाइनें, वार्ड दर वार्ड", meta: "इन्वेस्टिगेशन • 9 मिनट रीड" },
      ],
    ).map((o, i) => ({ ...o, img: pic("prem", i, "600/450") })),
    shorts: pick(
      [
        { dur: "0:48", title: "Rescue operation at the blast site" },
        { dur: "1:12", title: "Waterlogging brings city traffic to a halt" },
        { dur: "0:36", title: "The record-breaking knock, ball by ball" },
        { dur: "0:59", title: "Dengue vaccine explained in 60 seconds" },
        { dur: "1:04", title: "New metro route map, section by section" },
        { dur: "0:41", title: "Rescue teams wade through flooded fields" },
      ],
      [
        { dur: "0:48", title: "धमाके की जगह पर रेस्क्यू ऑपरेशन" },
        { dur: "1:12", title: "जलभराव से शहर का ट्रैफिक ठहरा" },
        { dur: "0:36", title: "रिकॉर्ड तोड़ पारी, गेंद दर गेंद" },
        { dur: "0:59", title: "डेंगू वैक्सीन 60 सेकंड में समझें" },
        { dur: "1:04", title: "नया मेट्रो रूट मैप, सेक्शन दर सेक्शन" },
        { dur: "0:41", title: "जलमग्न खेतों में राहत टीमें" },
      ],
    ).map((o, i) => ({ ...o, img: pic("short", i, "450/650") })),
    shortsGrid: Array.from({ length: 16 }, (_, i) => ({
      dur: ["0:36", "0:48", "1:02", "0:55"][i % 4],
      title: pick(
        ["Rescue at the blast site", "City waterlogging", "The record knock", "Vaccine explained", "New metro route", "Relief camp visit", "Protest in the capital", "Budget rework fallout"],
        ["धमाके की जगह रेस्क्यू", "शहर में जलभराव", "रिकॉर्ड पारी", "वैक्सीन समझें", "नया मेट्रो रूट", "राहत कैंप का दौरा", "राजधानी में प्रदर्शन", "बजट बदलाव का असर"],
      )[i % 8],
      views: 12 + i * 7 + (H ? "K व्यूज़" : "K views"),
      img: pic("vh", i, "450/800"),
    })),
    catList: pick(
      [
        { title: "Squad for the limited-overs series to be announced tomorrow", meta: "20 min ago" },
        { title: "Coach concedes batting frailty after the series defeat", meta: "1 hour ago" },
        { title: "East Bengal edge past Mohun Bagan in a five-goal derby", meta: "2 hours ago" },
        { title: "Auction watch: four players everyone is tracking", meta: "3 hours ago" },
        { title: "Domestic season schedule out; Kolkata hosts the opener", meta: "4 hours ago" },
        { title: "Pacer cleared to return after four months on the sidelines", meta: "5 hours ago" },
      ],
      [
        { title: "सीमित ओवरों की सीरीज़ के लिए टीम का ऐलान कल", meta: "20 मिनट पहले" },
        { title: "सीरीज़ हार के बाद कोच ने बैटिंग की कमज़ोरी मानी", meta: "1 घंटा पहले" },
        { title: "पांच गोल के डर्बी में ईस्ट बंगाल की जीत", meta: "2 घंटे पहले" },
        { title: "ऑक्शन वॉच: चार खिलाड़ियों पर सबकी नज़र", meta: "3 घंटे पहले" },
        { title: "घरेलू सीज़न का शेड्यूल जारी, पहला मैच कोलकाता में", meta: "4 घंटे पहले" },
        { title: "चार महीने बाद वापसी को तैयार तेज़ गेंदबाज़", meta: "5 घंटे पहले" },
      ],
    ).map((o, i) => ({ ...o, img: pic("clist", i, "600/450") })),
    catGrid: pick(
      [
        { kicker: "ANALYSIS", title: "What the numbers say about home advantage this season" },
        { kicker: "INTERVIEW", title: "'I learnt to bat under pressure' — the young opener" },
        { kicker: "STATS", title: "The five highest wicket-takers of the season so far" },
        { kicker: "FITNESS", title: "Three players fail the revised fitness test" },
        { kicker: "DOMESTIC", title: "Six new teams enter as the format changes" },
        { kicker: "AUCTION", title: "Record bids expected at next month's auction" },
        { kicker: "OPINION", title: "Will the five-bowler formula hold up away from home?" },
        { kicker: "FAN ZONE", title: "Stadium ticket sales set a new record" },
      ],
      [
        { kicker: "एनालिसिस", title: "इस सीज़न होम एडवांटेज पर आंकड़े क्या कहते हैं" },
        { kicker: "इंटरव्यू", title: "'दबाव में बैटिंग सीखी है' — युवा ओपनर" },
        { kicker: "स्टैट्स", title: "सीज़न के अब तक के पांच टॉप विकेट टेकर" },
        { kicker: "फिटनेस", title: "नए फिटनेस टेस्ट में तीन खिलाड़ी फेल" },
        { kicker: "डोमेस्टिक", title: "फॉर्मेट बदला, छह नई टीमें शामिल" },
        { kicker: "ऑक्शन", title: "अगले महीने की नीलामी में रिकॉर्ड बोली की उम्मीद" },
        { kicker: "ओपिनियन", title: "क्या पांच गेंदबाज़ों का फॉर्मूला बाहर भी चलेगा" },
        { kicker: "फैन ज़ोन", title: "स्टेडियम टिकट बिक्री ने नया रिकॉर्ड बनाया" },
      ],
    ).map((o, i) => ({ ...o, img: pic("cgrid", i, "700/440") })),
    liveUpdates: pick(
      [
        { time: "11:40 IST", text: "Fourth unit sealed; licence audit ordered across the block" },
        { time: "11:12 IST", text: "Rail services resume after safety inspection of overhead lines" },
        { time: "10:35 IST", text: "Six injured shifted to the district hospital's critical care unit" },
        { time: "09:50 IST", text: "NDRF team reaches the site, search operation underway" },
      ],
      [
        { time: "11:40 IST", text: "चौथी यूनिट सील; पूरे ब्लॉक में लाइसेंस ऑडिट का आदेश" },
        { time: "11:12 IST", text: "ओवरहेड लाइनों की जांच के बाद रेल सेवा बहाल" },
        { time: "10:35 IST", text: "छह घायल जिला अस्पताल के क्रिटिकल केयर में शिफ्ट" },
        { time: "09:50 IST", text: "NDRF टीम मौके पर पहुंची, सर्च ऑपरेशन जारी" },
      ],
    ),
    related: pick(
      ["Storage licence rules: what the law actually requires", "Magisterial inquiry ordered, report due in 15 days", "Compensation announced for families of the deceased", "Four units in the cluster sealed pending inspection"],
      ["स्टोरेज लाइसेंस के नियम: कानून असल में क्या कहता है", "मजिस्ट्रेट जांच का आदेश, 15 दिन में रिपोर्ट", "मृतकों के परिजनों के लिए मुआवज़े का ऐलान", "क्लस्टर की चार यूनिट जांच पूरी होने तक सील"],
    ).map((title, i) => ({ title, img: pic("rel", i, "400/300") })),
    channels: ["Taaza TV HD", "Taaza Bangla", "Taaza Sports", "Taaza Fast"].map((label, i) => ({ label, img: pic("chan", i, "600/340") })),
    schedule: pick(
      [
        { time: "07:00", show: "Morning Headlines", host: "Priya Singh" },
        { time: "09:00", show: "News 100", host: "Rahul Mehra" },
        { time: "12:00", show: "Midday Report", host: "Neha Gupta" },
        { time: "15:00", show: "Prime Debate", host: "Ankit Verma" },
        { time: "18:00", show: "Sports Roundup", host: "Sameer Khan" },
        { time: "20:00", show: "The Verdict", host: "Meera Joshi" },
        { time: "22:00", show: "Night Bulletin", host: "Vivek Rai" },
      ],
      [
        { time: "07:00", show: "सुबह की सुर्खियां", host: "प्रिया सिंह" },
        { time: "09:00", show: "न्यूज़ 100", host: "राहुल मेहरा" },
        { time: "12:00", show: "दोपहर का हाल", host: "नेहा गुप्ता" },
        { time: "15:00", show: "हल्ला बोल", host: "अंकित वर्मा" },
        { time: "18:00", show: "खेल राउंडअप", host: "समीर खान" },
        { time: "20:00", show: "आज का फैसला", host: "मीरा जोशी" },
        { time: "22:00", show: "रात की खबर", host: "विवेक राय" },
      ],
    ) as { time: string; show: string; host: string }[],
    footA: pick(["Breaking News", "National News", "International News", "Entertainment News"], ["ब्रेकिंग न्यूज़", "देश", "दुनिया", "मनोरंजन"]),
    footB: pick(["Sports News", "Health News", "Video News", "Live TV"], ["खेल", "हेल्थ", "वीडियो", "लाइव TV"]),
    footC: pick(["About us", "Mission & Vision", "Advertise", "Careers", "Contact us", "Terms & Conditions"], ["हमारे बारे में", "मिशन और विज़न", "विज्ञापन", "करियर", "संपर्क करें", "नियम व शर्तें"]),
  };
}

export const footAHref = ["/", "/category/national", "/category/international-news", "/category/entertainment"];
export const footBHref = ["/category/sports", "/category/health", "/video", "/live-tv"];
export const footCHref = ["/about", "/about#mission", "/contact#advertise", "/contact#careers", "/contact", "https://taazatv.com/terms-conditions.php"];

export const SOCIALS = [
  // TODO: confirm handle; the old site mentions Instagram but never linked to it
  { name: "Instagram", href: "https://www.instagram.com/taazatv/", bg: "#d6249f", paths: ["M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z", "M16 11.4a4 4 0 1 1-3.4-3.4 4 4 0 0 1 3.4 3.4z", "M17.5 6.5h.01"] },
  { name: "Facebook", href: "https://www.facebook.com/taazabengal", bg: "#1877f2", paths: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"] },
  { name: "X", href: "https://x.com/taazatv", bg: "#121212", paths: ["M4 3l7.5 9.5L4.5 21", "M20 3l-7.5 9.5L19.5 21", "M4 3h4l12 18h-4z"] },
  { name: "YouTube", href: "https://www.youtube.com/@taazabengal1632", bg: "#ff0000", paths: ["M22.5 7.5a3 3 0 0 0-2.1-2.1C18.6 5 12 5 12 5s-6.6 0-8.4.4A3 3 0 0 0 1.5 7.5 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.5 3 3 0 0 0 2.1 2.1C5.4 19 12 19 12 19s6.6 0 8.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.5z", "M10 8.5l6 3.5-6 3.5z"] },
  { name: "WhatsApp", href: "https://api.whatsapp.com/send?phone=919831669998", bg: "#25d366", paths: ["M3 21l1.7-5A9 9 0 1 1 8 19.3z", "M9 8.5c0 3.5 3 6.5 6.5 6.5l1.5-1.5-2-1-1 1c-1.2-.5-2.5-1.8-3-3l1-1-1-2z"] },
];
