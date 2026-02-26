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
    proxy: {
      // Проксируем запросы к API
      "/api": {
        target: "http://0.0.0.0:5050",
      },
      // Проксируем WebSocket соединения
      "/socket.io": {
        target: "ws://0.0.0.0:5050",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
