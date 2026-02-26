import { io } from "socket.io-client";

export const socket = io("", {
  autoConnect: true,
  timeout: 20000
});