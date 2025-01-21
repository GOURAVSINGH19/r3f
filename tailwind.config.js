/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg1: "#0e0e0e",
        bg2: "#697565",
        bg3: "#D9D9D9",
        text: "white",
        // text: "#ECDFCC",
      },
    },
  },
  plugins: [],
};
