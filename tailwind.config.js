/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'title': '#583F27', //color titulo
        'subtitle': '#775F47', //color subtitulo
        'content': '#7B6F63', //color texto contenido
        'icons': '#9E734B', //color iconos
        'icons-on': '#D39357', //color iconos encendidos
        'icons-off': '#B1967D', //color iconos apagados
        'button': '#b39374', //color boton
        'button-off': '#f1eae4', //color boton apagado
        'button-on': '#9a6f46', //color boton encendido
        'button-degree': '#bca185', //color boton principal degradado / bca185 o 9d8166
        'bg': '#FFFBF2', //bg blanco
        'bg2': '#fff7ed', //bg cafe claro
        'lines': '#E6D7C3', //color lineas y bordes
        'border': '#b3b374', //color lineas y bordes
        'border-on': '#dacf8d', //color lineas y bordes
        'special-1': '#DBB38D',
        'box': '#FFFAF5',
        'blank': '#FBFBFB',
        'footerbg': '#473D39',
        'special-button': '#885C40',
        'special-button-on': '#AF7D5E',
        'neon-cyan': '#e2d6ca',
        'delete': '#ff5942',
        'delete-on': '#ff2f12',
      },
      keyframes: {
        blur: {
          '0%': {
            boxShadow: 'none',
            background: 'rgba(0, 0, 0, 1)',
            backdropFilter: 'blur(0)'
          },
          '100%': {
            boxShadow: '0px 5px 50px -5px rgba(0, 0, 0, 0.1), 0px 0px 0 1px rgba(0, 0, 0, 0.3)',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 5px theme("colors.neon-cyan")',
            boxShadow: '0 0 10px theme("colors.neon-cyan")'
          },
          '50%': { 
            textShadow: '0 0 15px theme("colors.neon-cyan"), 0 0 20px theme("colors.neon-cyan")',
            boxShadow: '0 0 20px theme("colors.neon-cyan"), 0 0 30px theme("colors.neon-cyan")'
          },
          rotateSweep: {
            '0%': { transform: 'translateX(-100%) translateY(12px) rotate(-90deg)' },
            '100%': { transform: 'rotate(-180deg)' },
          },
          widthExpand: {
            '0%': { width: '0' },
            '100%': { width: '100%' },
          },
          circleScale: {
            '0%': { transform: 'scale(0)' },
            '100%': { transform: 'scale(1)' },
          }
        },
      },
      animation: {
        blur: 'blur linear both',
        shimmer: 'shimmer 2s infinite linear',
        shake: 'shake 0.4s ease-in-out',
        'neon-pulse': 'neonPulse 1.5s infinite ease-in-out',
        'rotate-sweep': 'rotateSweep 0.3s ease-in-out forwards',
        'width-expand': 'widthExpand 0.5s ease-in-out forwards',
        'circle-scale': 'circleScale 1.5s ease-out forwards',
      },
      boxShadow: {
        'neon': '0 0 10px theme("colors.neon-cyan")',
        'neon-md': '0 0 15px theme("colors.neon-cyan")',
        'neon-lg': '0 0 20px theme("colors.neon-cyan")',
      },
      textShadow: {
        'neon': '0 0 5px theme("colors.neon-cyan")',
        'neon-md': '0 0 10px theme("colors.neon-cyan")',
        'neon-lg': '0 0 15px theme("colors.neon-cyan")',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow') // Necesario para textShadow utilities
  ],
};