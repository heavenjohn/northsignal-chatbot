/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ed1c24",
        dark: "#111111",
        yellow: "#f5c001",
      },
      container: {
        center: true, // Centers the container
        padding: {
          DEFAULT: '1rem',  // 1rem padding by default
          sm: '2rem',       // 2rem padding on small screens
          md: '3rem',       // 3rem padding on medium screens
          lg: '4rem',       // 4rem padding on large screens
          xl: '5rem',       // 5rem padding on extra-large screens
        },
      },
    },
  },
  plugins: [],
};
