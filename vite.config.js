import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss({
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              light: {
                pagebg: "#ffffff",
                btnbg: "#000000",
                btnHover: "#0000004D",
                headerbg: "#ffffff",
                navLinks: "#000000",
                h1: "#000000",
                h2: "#000000",
                h3: "#000000",
                text: "#000000",
              },
              dark: {
                pagebg: "#12372a",
                btnbg: "#000000",
                btnHover: "#0000004D",
                headerbg: "#0B3D2E",
                navLinks: "#FBFADA",
                h1: "#FBFADA",
                h2: "#ADBC9F",
                text: "#ADBC9F",
              },
              primary: "#FF7F50",
              secondary: "#FFD166",
              accent: "#06D6A0",
              background: "#121212",
              card: "#1E1E2F",
              textPrimary: "#F5F5F5",
              textSecondary: "#B0B0B0",
              border: "#2A2A3C",
              error: "#EF476F",
              success: "#06D6A0",
            },
          },
        },
        plugins: [],
      },
    }),
    react()],
})
