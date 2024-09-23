/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.3)",
      },
      colors: {
        main: "#ee3131",
      },
      fontFamily: {
        main: "poppins",
        KdamThmorPro: "Kdam Thmor Pro",
      },
      flex: {
        2: "2 2  0%",
        3: "3 3  0%",
        4: "4 4  0%",
        5: "5 5  0%",
        6: "6 6  0%",
        7: "7 7  0%",
        8: "8 8  0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40)",
            transform: "translateY(20)",
          },
          "100%": {
            "-webkit-transform": "translateY(0px)",
            transform: "translateY(0px)",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8px)",
            transform: "translateY(8px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0px)",
            transform: "translateY(0px)",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: " translateX(-500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: " translateX(0)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            " transform": "scale(1)",
          },
        },
      },
      animation: {
        "scale-up-center":
          "scale-up-center 0.14s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top-sm": "slide-top-sm 0.2s linear both;",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
