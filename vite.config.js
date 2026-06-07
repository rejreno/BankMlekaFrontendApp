import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Ten alias precyzyjnie wskaże ścieżkę absolutną do plików bez polegania na relatywnych kropkach
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Wymusza na Vite ignorowanie problemów z pamięcią podręczną wielkości liter na Windowsie
    fs: {
      strict: false,
    },
    proxy: {
      "/api": {
        target: "https://localhost:44345",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})