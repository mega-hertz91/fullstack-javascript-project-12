import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
