/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", ".public/index.html"],
  theme: {
    screens: {
      xs: { max: "640px" },

      sm: { min: "640px", max: "768px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(-1000px)",
            transform: "translateY(-1000px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "slide-none": {
          "0%": {
            display: "flex",
          },
          "100%": {
            display: "none",
          },
        },
      },
      animation: {
        "slide-bottom":
          "slide-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-none":
          "slide-none 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top":
          "slide-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "swing-top-fwd":
          "swing-top-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [],
};
