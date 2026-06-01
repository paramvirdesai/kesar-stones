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
      boxShadow: {
        editorial: "0 4px 24px rgba(74, 68, 63, 0.06), 0 1px 0 rgba(255, 255, 254, 0.9) inset",
        "editorial-hover": "0 12px 40px rgba(74, 68, 63, 0.1), 0 0 0 1px rgba(235, 229, 223, 0.8)"
      }
    }
  },
  plugins: []
};
