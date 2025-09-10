export type Social = { label: string; url: string };
// discordId and discordAvatar are optional — if provided we will render the
// avatar from Discord's CDN (preferred). Otherwise fall back to `image`.
export type Member = {
  name: string;
  role: string;
  bio: string;
  about?: string;
  socials?: Social[];
  image: string;
  slug: string;
  discordId?: string;
  discordAvatar?: string | null;
  // Optional banner image (e.g., "/banners/ayush.jpg" in public/ or a remote URL allowed by next.config)
  bannerImage?: string;
};

export const TEAM: Member[] = [
  {
    name: "Ashis",
    role: "Developer",
    bio: "Full‑stack developer shipping features and performance improvements across the bot and website.",
    about:
      "Ashis focuses on core features, stability, and developer experience. Loves clean code, fast builds, and smooth UX for both users and contributors.",
    socials: [
      { label: "Instagram", url: "https://instagram.com/ashis" },
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Portfolio", url: "https://ashis.dev" },
    ],
    image: "/swellyG1.png",
    slug: "ashis",
  },
  {
    name: "Ayush Edith",
    role: "Owner & Website Manager",
    bio: "Building fast, reliable music experiences for communities and maintaining the Swelly website.",
    about:
      "Ayush leads product and web experience for Swelly — focusing on low‑latency audio, robust scaling, and delightful UI. Previously worked on media platforms and enjoys optimizing for reliability.",
    socials: [
      { label: "Website", url: "https://meayush.xyz" },
      { label: "GitHub", url: "https://github.com/ayushedith" },
      { label: "Twitter", url: "https://twitter.com/ayushedith" },
    ],
    image: "/swelly1.png",
    slug: "ayush-edith",
    bannerImage: "/banners/ayush.jpg",
    discordId: "581525444424368131",
    discordAvatar: "b5b9c5ff013d0247144930cfac1297b9",
  },
  {
    name: "Ros",
    role: "Co-Owner",
    bio: "Co‑owner focusing on operations, partnerships, and product direction.",
    about:
      "Ros keeps the wheels turning — aligning roadmap, partnerships, and community needs to deliver a reliable music experience.",
    socials: [
      { label: "Instagram", url: "https://instagram.com/ros" },
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Twitter", url: "https://twitter.com/ros" },
    ],
    image: "/swellyG2.png",
    slug: "ros",
  },
  {
    name: "Aron",
    role: "Community Moderator",
    bio: "Moderating the community and helping users get the most out of Swelly.",
    about:
      "Aron supports users, enforces guidelines, and surfaces feedback to improve the product. Passionate about helpful docs and friendly support.",
    socials: [
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Instagram", url: "https://instagram.com/aron" },
    ],
    image: "/mascot.png",
    slug: "aron",
  },
];

export function findMemberBySlug(slug?: string) {
  if (!slug) return null;
  return TEAM.find((m) => m.slug === slug) ?? null;
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
