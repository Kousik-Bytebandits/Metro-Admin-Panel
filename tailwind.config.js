export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
      },
       boxShadow: {
    'custom-blue': '0px 5px 14px 0px #00285D',
  },
   animation: {
        wave: "wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite",
        swell: "swell 7s ease-in-out infinite",
       loaderWave: 'loaderWave 0.8s infinite ease-in-out',
      },
      keyframes: {
        wave: {
          "0%": { marginLeft: "0" },
          "100%": { marginLeft: "-1600px" },
        },
        swell: {
          "0%, 100%": { transform: "translate3d(0,-25px,0)" },
          "50%": { transform: "translate3d(0,5px,0)" },
        },
         loaderWave: {
          '0%, 80%, 100%': {
            opacity: '0.75',
            height: '32px',
            boxShadow: '0 0 #076fe5',
          },
          '40%': {
            opacity: '1',
            height: '40px',
            boxShadow: '0 -8px #076fe5',
          },
        },
      },
    },
  },
  plugins: [],
};
