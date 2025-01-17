/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: "#1E1E1E",
        bg2: "#697565",
        bg3: "#D9D9D9",
        text: "white",
        // text: "#ECDFCC",
      },
    },
  },
  plugins: [],
};
