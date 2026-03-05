import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "./src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': root,
    },
  },
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      "/api": {
        target: "http://0.0.0.0:5001",
      },
      // Проксируем WebSocket соединения
      "/socket.io": {
        target: "ws://0.0.0.0:5001",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
