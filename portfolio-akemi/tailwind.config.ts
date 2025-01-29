import type { Config } from "tailwindcss";
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      clipPath: {
        'triangle-left': 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
        'triangle-right': 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
        'shadow': 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
      },
      keyframes: {
        lefttriangle: {
          '0%':{background: '#F4F4F4'},
          '30%':{background: '#F4F4F4'},
          '70%': {background: '#DDDADA'},
          '100%': {background: '#DDDADA'},
        },
        righttriangle: {
          '0%':{background: '#DDDADA'},
          '30%':{background: '#DDDADA'},
          '70%': {background: '#F4F4F4'},
          '100%': {background: '#F4F4F4'},
        },
        sunmovement: {
          '0%':{transform: 'translate(83px, 153px) rotate(-190deg) translate(90px, 90px)'},
          '50%': {transform: 'translate(83px, 153px) rotate(-135deg) translate(90px, 90px)'},
          '100%': {transform: 'translate(83px, 153px) rotate(-75deg) translate(90px, 90px)'},
          // '100%':{transform: 'translate(83px, 153px) rotate(0deg) translate(90px, 90px)'},
        },
        daytonight: {
          '0%':{background: '#272C34'},
          '30%':{background: '#7DDFFC'},
          '70%': {background: '#7DDFFC'},
          '100%': {background: '#272C34'},
        },
      },
      animation: {
        'sunset': 'sunmovement 4s linear infinite',
        'daytonight': 'daytonight 4s linear infinite',
        'leftshadow': 'lefttriangle 4s linear infinite',
        'rightshadow': 'righttriangle 4s linear infinite',
      }
    },
  },
  plugins: [
    function({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.clip-triangle-left': {
          'clip-path': 'polygon(0% 100%, 100% 100%, 50% 0%)',
        },
        '.clip-triangle-right': {
          'clip-path': 'polygon(70% 100%, 100% 100%, 50% 0%)',
        },
        '.clip-shadow': {
          'clip-path': 'polygon(0% 100%, 100% 100%, 50% 0%)',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};
export default config;
