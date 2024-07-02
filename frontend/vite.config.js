import { defineConfig } from "vite";
port react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        //target: "http://localhost:3000",
         target: "https://elevate-self-backend.vercel.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
