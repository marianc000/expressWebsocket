import { display } from './table.js';

const BASE_URL = document.baseURI;
const path = new URL(BASE_URL).pathname.replace('/', '');

let url = BASE_URL.replace('http', 'ws').replace(path, '') + 'subscribe';

console.log("url", BASE_URL, url, path);
const socket = new WebSocket(url);

socket.onopen = () => {
  console.log("connected");
}

socket.onmessage = e => {
  console.log('received:', e.data);
  const data = JSON.parse(e.data);
  display(data);
}