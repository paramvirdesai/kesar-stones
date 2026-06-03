/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        patagonia: {
          cream: "#F9F5F0",
          ivory: "#FFEECC",
          white: "#FFFFFE",
          border: "#EBE5DF",
          taupe: "#4A443F",
          chocolate: "#48357B",
          amber: "#A79320",
          copper: "#EB8B7C"
        }
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Montserrat"', '"Inter"', "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"]
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxury-out": "cubic-bezier(0.33, 1, 0.68, 1)"
      },
      transitionDuration: {
        700: "700ms",
        8000: "8000ms"
      },
      animation: {
        "cinematic-pan": "cinematicPan 8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-pulse": "scrollPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "glow-breathe": "glowBreathe 4s cubic-bezier(0.16, 1, 0.3, 1) infinite"
      },
      keyframes: {
        cinematicPan: {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.05) translate3d(-0.5%, -0.35%, 0)" }
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.35", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(6px)" }
        },
        glowBreathe: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(235, 139, 124, 0)" },
          "50%": { boxShadow: "0 0 48px 8px rgba(235, 139, 124, 0.15)" }
        }
      },
      boxShadow: {
        editorial: "0 4px 24px rgba(74, 68, 63, 0.06), 0 1px 0 rgba(255, 255, 254, 0.9) inset",
        "editorial-hover": "0 24px 64px rgba(74, 68, 63, 0.12), 0 8px 24px rgba(74, 68, 63, 0.06)",
        "museum-lift": "0 32px 80px rgba(74, 68, 63, 0.14), 0 12px 32px rgba(74, 68, 63, 0.08)"
      }
    }
  },
  plugins: []
};
