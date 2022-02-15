import { now } from './time.js';


let clientData = [];
setTimeout(send);


function remove(res) {
    console.log('sse closed');
    clientData = clientData.filter(o => o.res !== res);
}
let sequence = 1;

export function addSSEClient(req, res) {
    console.log(">addSSEClient");
    req.on('close', () => remove(res));

    clientData.push({
        res,
        "connected since": now(),
        "id": sequence++
    });
}

function send() {
    clientData.forEach(o => {
        const data = Object.assign({
            "client count": clientData.length,
            "sent at": now()
        }, o);
        delete data.res;
        o.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    setTimeout(send, 1300);
}


