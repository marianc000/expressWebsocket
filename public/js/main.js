import { displaySSE,displayWS } from './table.js';

const BASE_URL = document.baseURI;
const path = new URL(BASE_URL).pathname.replace('/', '');

let url = BASE_URL.replace('http', 'ws').replace(path, '') + 'ws';

console.log("url", BASE_URL, url, path);
const socket = new WebSocket(url);

socket.onopen = () => {
  console.log("connected");
}

socket.onmessage = e => {
 // console.log('received:', e.data);
  const data = JSON.parse(e.data);
  displayWS(data);
}

const source = new EventSource("/sse");
source.onmessage = function(e) {
  const data = JSON.parse(e.data);
  displaySSE(data);
};