// socket.js (or socket.ts)
import { io } from "socket.io-client";

export const socket = io("https://chat-backend-ypo5.onrender.com/", {
  transports: ["websocket"],
});
