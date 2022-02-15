import { now } from './time.js';

let clients;
let clientData = [];

export function initWS(allClients) {
    clients = allClients;
    setTimeout(send);
}

function remove(ws) {
    console.log('websocket closed');
    clientData = clientData.filter(o => o.ws !== ws);
}
let sequence=1;

export function addWSClient(ws) {
    console.log(">addWSClient" );
 
    ws.onclose = () => remove(ws);

    clientData.push({
        ws,
        "connected since": now(),
        "id":sequence++
    });
}

function send() {
    clientData.forEach(o => {
        const data = Object.assign({
            "client count": clients.size,
            "sent at":  now()
        }, o);
        delete data.ws;
        o.ws.send(JSON.stringify(data));
    });

    setTimeout(send, 1000);
}