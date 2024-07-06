import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://elevate-self-api-peach.vercel.app',
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'ElevateSelf',
        short_name: 'ElevateSelf',
        description: 'Web site created using Vite',
        theme_color: '#000000',
        icons: [
          {
            src: 'icons/ElevateSelf.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/ElevateSelf.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/ElevateSelf.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/ElevateSelf.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff'
      },
      registerType: 'autoUpdate',
      includeAssets: ['ElevateSelf.ico', 'robots.txt', 'icons/ElevateSelf.png']
    })
  ],
});