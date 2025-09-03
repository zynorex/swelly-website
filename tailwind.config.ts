import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "#cbd5e0",
        // Switch primary to blurple palette for site-wide consistency
        primary: { DEFAULT: "#5865F2", light: "#7c6CFF" },
        accent: {
          teal: "#f97316",
          violet: "#a78bfa",
        },
        surface: "#111111",
      },
      boxShadow: {
  // Theme-matching bluish/purple glow (Discord-like)
  glow: "0 0 20px rgba(88, 101, 242, 0.35), 0 0 40px rgba(167, 139, 250, 0.25)",
      },
      backgroundImage: {
        aurora: "linear-gradient(135deg, #0d0d10, #2a0000, #1a0a0a)",
        btnGradient: "linear-gradient(90deg, #ef4444, #f97316)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
