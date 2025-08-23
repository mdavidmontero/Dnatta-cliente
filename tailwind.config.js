import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "home-xl": "40% auto",
      },
      backgroundImage: {
        home: "url('/bgd.png')",
      },
      backgroundPosition: {
        "home-position": "right center",
      },
      colors: {
        "bg-primary": "#3C6997",
        "bg-primary-bg": "#F1E3A5",
        "bg-violeta": "#672450",
        "bg-violeta-hover": "#902450",
        "btn-primary": "#D4774B",
        "btn-secondary": "#BBCFC3",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [forms, animate, scrollbar],
};
