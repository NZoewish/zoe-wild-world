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
        safari: {
          dark: "#0b1329",
          card: "#132247",
          accent: "#38bdf8",
        },
        category: {
          pets: "#ff6b6b",        // Cats & Dogs (Warm Coral)
          dino: "#f59e0b",        // Dinosaurs & Extinct (Amber/Rust)
          ocean: "#06b6d4",       // Ocean & Deep Sea (Teal/Cyan)
          mammals: "#10b981",     // Wild Mammals (Emerald)
          reptiles: "#84cc16",    // Reptiles & Insects (Electric Lime)
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-comic-display)", "system-ui", "sans-serif"]
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
};
export default config;
