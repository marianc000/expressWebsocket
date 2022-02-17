import express from 'express';
import expressWs from 'express-ws'; 

const app = express();
expressWs(app);

app.ws('/ws', (ws, req) => {
    addWSClient(ws);
}); 

const port = process.env.PORT || 3000;

app.listen(port);

let sequence = 1;
let clientData = [];
 
export function addWSClient(ws) {
    ws.onclose = () => clientData = clientData.filter(o => o.ws !== ws);

    clientData.push({
        ws,
        clientNo: sequence++,
        messageNo: 1
    });
}

function send() {
    clientData.forEach(o => {
        const data = JSON.stringify({
            clientCount: clientData.length,
            clientNo: o.clientNo,
            messageNo: o.messageNo++
        });

        o.ws.send(data);
    });

    setTimeout(send, 1000);
}

setTimeout(send, 1000);
//
import express from 'express';

const app = express();

app.get('/sse', (req, res) => {
  res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
  });
  addSSEClient(req, res);
});

let clientData = [];
let sequence = 1;

export function addSSEClient(req, res) {
    req.on('close', () =>  clientData = clientData.filter(o => o.res !== res));

    clientData.push({
        res,
        clientNo: sequence++,
        messageNo: 1
    });
}

function send() {
    clientData.forEach(o => {
        const data = JSON.stringify({
            clientCount: clientData.length,
            clientNo: o.clientNo,
            messageNo: o.messageNo++
        });

        o.res.write(`data: ${data}\n\n`);
    });

    setTimeout(send, 1000);
}

setTimeout(send);

const port = process.env.PORT || 3000;

app.listen(port);
 
///
const socket = new WebSocket('wss://express-websocket-sse.glitch.me/ws');

socket.onmessage = e => {
  const data = JSON.parse(e.data);
  displayWS(data);
}

const source = new EventSource('https://express-websocket-sse.glitch.me/sse');

source.onmessage =  (e)=> {
  const data = JSON.parse(e.data);
  displaySSE(data);
};