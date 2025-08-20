// // tailwind.config.js
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}", // For app directory (if using app router)
//     "./pages/**/*.{js,ts,jsx,tsx}", // For pages router
//     "./components/**/*.{js,ts,jsx,tsx}", // Reusable components
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}", // if you're using `src/`
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['"Open Sans"', "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
