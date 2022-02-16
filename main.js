import express from 'express';
import ew from 'express-ws';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initWS, addWSClient } from './ws.js';
import {  addSSEClient } from './sse.js';
//import { addClient,startPrivate } from './private.js';
const app = express();
const expressWs = ew(app);

initWS(expressWs.getWss().clients);
 

app.ws('/ws', (ws, req) => {
    addWSClient(ws);
});

app.get('/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'//,        'Connection': 'keep-alive'
    });
    addSSEClient(req, res);
});

const baseDir = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(baseDir, 'public')));

app.all('/data', (req, res) => {
    res.send({ data: 'ok' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})