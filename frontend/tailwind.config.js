/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =  withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { backgroundImage: { 'my-image' : "url('./assets/pets2.jpg')", 'register' : "url('./assets/Register.jpg')", }, },
  },
  plugins: [],
}
);

