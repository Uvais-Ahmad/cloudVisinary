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
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        beam: "beam 10s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        beam: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(30px)" },
        },
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes : [
      "dark",
      "synthwave",
    ]
  }
};
export default config;
