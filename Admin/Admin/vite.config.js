import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'https://ministore-backend.onrender.com', // Backend server
        changeOrigin: true,
      },
    },
  },
});
