import { now } from './time.js';

let clientData = [];
let serverClients;

export function startPrivate(clients) {
    serverClients = clients;
    setTimeout(send);
}

function remove(ws) {
    console.log('WebSocket was closed');
    clientData = clientData.filter(o => o.ws !== ws);
}

export function addClient(ws) {
    console.log("addClient");
    ws.onclose = () => remove(ws);

    clientData.push({
        ws,
        "connected since": now(),
        private: true
    });
}

function send() {
    const clients = [...serverClients];
    clientData.forEach(o => {
        const data = Object.assign({
            "client no": clients.indexOf(o.ws)+1,
            "sent at":  now()
        }, o);
        delete data.ws;
        o.ws.send(JSON.stringify(data));
    });

    setTimeout(send, 1567);
}
