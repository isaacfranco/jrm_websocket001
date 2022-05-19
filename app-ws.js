const WebSocket = require('ws');

let clients = [];
 
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    const json = JSON.parse(data);
    ws.send(JSON.stringify({
        type: 'confirmation',
        data: 'Recebido'
    }));
    console.log('streaming to', clients.length, 'clients');
    
    for (const client of clients) {
        console.log('envio?', data.toString());
        client.send(JSON.stringify({
            type: 'broadcast',
            username: json.username,
            message: json.message
        }));
    }
}

function onClose(ws, reasonCode, description) {
    console.log(`onClose: ${reasonCode} - ${description}`);
    const index = clients.indexOf(ws);
    if (index > -1) {
        clients.splice(index, 1);
    }
}
 
function onConnection(ws, req) {
    clients.push(ws);
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    ws.on('close', (reasonCode, description) => onClose(ws, reasonCode, description));
    ws.send(JSON.stringify({
        type: 'connection',
        data: 'Bem vindo'
    }))
    console.log(`onConnection`);
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });
 
    wss.on('connection', onConnection);
 
    console.log(`App Web Socket Server is running!`);
    return wss;
}