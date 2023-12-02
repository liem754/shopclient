/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", ".public/index.html"],
  theme: {
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
