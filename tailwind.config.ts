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
        primary: { DEFAULT: "#ef4444", light: "#f87171" },
        accent: {
          teal: "#f97316", // repurposed as warm orange accent
          violet: "#f43f5e", // repurposed as rose/pink accent
        },
        surface: "#111111",
      },
      boxShadow: {
        glow: "0 0 20px rgba(239, 68, 68, 0.5)",
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
