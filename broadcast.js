import { now } from './time.js';

let clients;

export function startBroadcast(allClients) {
    clients = allClients;
    setTimeout(send);
}

function send() {
    const message = getMessage();
    clients.forEach(o => o.send(message));
    setTimeout(send, 971);
}

function getMessage() {
    return JSON.stringify({
        "client count": clients.size,
        "sent at": now()
    });
}
