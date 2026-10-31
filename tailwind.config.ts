import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0B0D",
        foreground: "#ffffff",
        modfem: {
          racingEmerald: "#10B981",
          signalAmber: "#F59E0B",
          obsidian: "#0A0B0D",
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      }
    },
  },
  plugins: [],
};
export default config;
