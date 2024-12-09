/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/bg.jpg')",
      },
      backgroundSize: {
        "home-xl": "50%",
      },
      colors: {
        "bg-primary": "#3C6997",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
