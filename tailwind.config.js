/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        stonebrand: {
          900: "#1f1a17",
          700: "#3c322d",
          500: "#6a594e",
          300: "#b8a999",
          100: "#f3eee9"
        }
      }
    }
  },
  plugins: []
};
