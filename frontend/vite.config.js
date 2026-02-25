import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    proxy: {
      // Проксируем запросы к API
      "/api": {
        target: "http://localhost:5050",
      },
      // Проксируем WebSocket соединения
      "/socket.io": {
        target: "ws://localhost:5050",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
