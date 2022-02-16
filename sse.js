let clientData = [];

function remove(res) {
    console.log('sse closed');
    clientData = clientData.filter(o => o.res !== res);
}

let sequence = 1;

export function addSSEClient(req, res) {
    req.on('close', () => remove(res));

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
