/* Real channel details, carried over from the old site (taazatv.com). */

export const LIVE_STREAM = {
  // Bradmax player wrapping the channel's HLS feed, as embedded on taazatv.com/liveTV/
  embed: "https://bradmax.com/client/embed-player/ae5100d161f01d3871ca6e9a729b7e1a45977967_7821?mediaUrl=https://live.we2live.in/taazatv/live/playlist.m3u8",
  hls: "https://live.we2live.in/taazatv/live/playlist.m3u8",
};

export const APP_LINKS = {
  playStore: "https://play.google.com/store/apps/details?id=com.maxmobility.taazatv",
  appStore: "https://apps.apple.com/in/app/taaza-tv/id6450483538",
};

export const CONTACT = {
  email: "response@taazatv.com",
  phones: ["033-4068-1119", "98316 69987"],
  whatsapp: "+91 98316 69998",
  whatsappLink: "https://api.whatsapp.com/send?phone=919831669998",
};

export const GROUP_COMPANIES = [
  { name: "Taaza TV", hi: "ताज़ा TV", desc: "National Hindi Channel from Eastern India", href: "https://www.taazatv.com/" },
  { name: "Chhapte Chhapte", hi: "छपते छपते", desc: "Hindi Daily Newspaper" },
  { name: "MultiFX", hi: "MultiFX", desc: "Digital Interactive Screens", href: "https://www.mfxinteractive.com/" },
  { name: "FileITIndia", hi: "FileITIndia", desc: "GST filings made easy" },
  { name: "Taaza Digital", hi: "ताज़ा डिजिटल", desc: "Contentful Digital Marketing" },
];

export const LEGAL = {
  terms: "https://taazatv.com/terms-conditions.php",
  privacy: "https://taazatv.com/privacy-policy.php",
};
