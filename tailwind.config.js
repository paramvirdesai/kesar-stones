/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        corporate: {
          950: "#0a0c0e",
          900: "#12161a",
          800: "#1c2329",
          700: "#2a343c",
          600: "#4a5560",
          500: "#6b7785",
          400: "#94a0ad",
          300: "#c5cdd6",
          200: "#e4e8ed",
          100: "#f4f6f8",
          50: "#fafbfc",
          accent: "#a8b4c4",
          metal: "#c8d2dc"
        }
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Montserrat"', '"Inter"', "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"]
      },
      animation: {
        "ken-burns": "kenBurns 28s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 6s ease-in-out infinite"
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1.08) translate(0, 0)" },
          "100%": { transform: "scale(1.18) translate(-1.5%, -1%)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.55" }
        }
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        "glass-hover": "0 24px 48px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)"
      }
    }
  },
  plugins: []
};
