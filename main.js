import express from 'express';
import ew from 'express-ws';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { startBroadcast } from './broadcast.js';
import { addClient,startPrivate } from './private.js';
const app = express();
const expressWs = ew(app);

const clients = expressWs.getWss().clients;
startBroadcast(clients);
startPrivate(clients);

app.ws('/subscribe', (ws, req) => {
    console.log("connected");
    addClient(ws);
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