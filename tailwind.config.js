/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Outfit", "sans-serif"],
      },
      colors: {
        mcbege: '#ffeedb',
        mcmenta: '#d7ffec',
        mcverdeescuro: '#202b27',   
        mcazul: "#77C3D4" , 
      },
    },
    plugins: [
    ],
  }
}
