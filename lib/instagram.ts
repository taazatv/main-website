/** Taaza TV on Instagram (@taazatvchannel). */
export const IG_PROFILE = "https://www.instagram.com/taazatvchannel/";

/**
 * Reels shown on the Video page's Reels tab, newest first.
 * On Instagram open the reel → ⋯ / Share → "Copy link", and paste it here as a new line at the top.
 * Any reel or post link works, with or without the "?igsh=…" part.
 */
export const REEL_LINKS: string[] = [
  "https://www.instagram.com/taazatvchannel/reel/DfSDpqvhBsq/",
  "https://www.instagram.com/taazatvchannel/reel/DfRvt4vhofm/",
  "https://www.instagram.com/taazatvchannel/reel/DfPR637BIT5/",
  "https://www.instagram.com/taazatvchannel/reel/DfPMTjPBdc2/",
  "https://www.instagram.com/taazatvchannel/reel/DfO73sGBZsf/",
  "https://www.instagram.com/taazatvchannel/reel/DfObBYRz1zj/",
  "https://www.instagram.com/taazatvchannel/reel/DfM_sBfESMr/",
  "https://www.instagram.com/taazatvchannel/reel/DfM3kp2CudQ/",
  "https://www.instagram.com/taazatvchannel/reel/DfMZvFXjdzS/",
  "https://www.instagram.com/taazatvchannel/reel/DfJdGmpB5sL/",
  "https://www.instagram.com/taazatvchannel/reel/DfIBBR6k49z/",
  "https://www.instagram.com/taazatvchannel/reel/DfHlm_KhZ0A/",
];

export type IgReel = { shortcode: string; permalink: string };

/** REEL_LINKS as embeddable reels; links that aren't Instagram reel/post links are skipped. */
export const REELS: IgReel[] = REEL_LINKS.flatMap((link) => {
  const shortcode = link.match(/instagram\.com\/(?:[^/]+\/)?(?:reels?|p|tv)\/([A-Za-z0-9_-]+)/)?.[1];
  return shortcode ? [{ shortcode, permalink: `https://www.instagram.com/reel/${shortcode}/` }] : [];
});
