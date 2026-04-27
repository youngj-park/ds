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
        navy: {
          900: "#1a2332",
          800: "#1e2a3a",
          700: "#243447",
          600: "#2c3e50",
        },
        accent: {
          DEFAULT: "#3b82f6",
          hover: "#2563eb",
          light: "#dbeafe",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          border: "#e2e8f0",
        },
        text: {
          primary: "#1e293b",
          secondary: "#64748b",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "SUIT", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
