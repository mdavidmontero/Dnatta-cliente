import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "home-xl": "48%",
      },
      backgroundImage: {
        home: "url('/bg.jpg')",
      },
      colors: {
        "bg-primary": "#3C6997",
        "bg-primary-bg": "#F1E3A5",
        "bg-violeta": "#672450",
        "bg-violeta-hover": "#902450",
        "btn-primary": "#D4774B",
        "btn-secondary": "#BBCFC3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [forms, animate],
};
