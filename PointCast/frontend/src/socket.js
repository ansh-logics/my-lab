import { io } from 'socket.io-client';

// Use env var so you can update ngrok URL without code changes (free ngrok URLs change on restart).
// Fallback for local dev without ngrok.
const URL =
  import.meta.env.VITE_SOCKET_URL ||
  'https://cutaneous-isabella-untrustful.ngrok-free.dev';

const ngrokHeader = { 'ngrok-skip-browser-warning': '1' };

export const socket = io(URL, {
  
  extraHeaders: ngrokHeader,
  transportOptions: {
    polling: { extraHeaders: ngrokHeader },
  },
});