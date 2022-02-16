let clientData = [];
 
function remove(ws) {
    console.log('websocket closed');
    clientData = clientData.filter(o => o.ws !== ws);
}

let sequence = 1;

export function addWSClient(ws) {
    ws.onclose = () => remove(ws);

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