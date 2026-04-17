import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: true,        // 🔥 expose to network (same as --host)
    port: 5173,
    strictPort: true,
    allowedHosts : true,
    cors: true,  
    proxy: {        // 🔥 allow ngrok requests
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://backend:3000', for Docker
        changeOrigin: true,
      },
    },      
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})
