/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.ts", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
