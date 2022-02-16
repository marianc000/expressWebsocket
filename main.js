import express from 'express';
import expressWs from 'express-ws';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { addWSClient } from './ws.js';
import { addSSEClient } from './sse.js';

const app = express();
expressWs(app);

app.ws('/ws', (ws, req) => {
    addWSClient(ws);
});

app.get('/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
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
    console.log(`Listening on port ${port}`)
})