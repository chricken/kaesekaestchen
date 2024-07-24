'use strict';

import game from './game.js';
import settings from './settings.js';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

const handleMsg = (msg, socket) => {
    msg = msg.toString();
    msg = JSON.parse(msg);
    console.log('Nachricht empfangen', msg);

    // Die zu der Nachricht gehörende Methode aufrufen
    switch (msg.type) {
        case 'incrementPlayer':
            game.incrementPlayer()
            break;
        case 'removePlayer':
            game.removePlayer()
            break;
        case 'addPlayer':
            game.addPlayer(sendPlayerID, socket)
            break;
        case 'nextPlayer':
            game.nextPlayer()
            break;
        case 'handleClick':
            game.handleClick(msg.payload)
            break;
        default:
            break;
    }
}

const updatePlayer = () => {
    console.log('Updating');
    wss.clients.forEach(socket => {
        socket.send(JSON.stringify({
            type: 'update',
            payload: {
                width: settings.spielfeldWidth,
                height: settings.spielfeldHeight,
                felder: settings.felder,
                kantenHorz: settings.kantenHorz,
                kantenVert: settings.kantenVert,
            }
        }))
    })
}

const sendPlayerID = (id, socket) => {
    let payload = {
        id
    }
    socket.send(JSON.stringify({
        type: 'yourIDIs',
        payload
    }))
    console.log('ID versandt', id);
}

const handleDisconnection = socket => {
    console.log('Verbindung beendet', socket);
}

const handleConnection = socket => {
    console.log('Verbindung hergestellt');
    socket.on('close', handleDisconnection);
    socket.on('message', msg => handleMsg(msg, socket));

    updatePlayer(socket);
}

const handleListening = () => {
    console.log('SocketServer ist bereit und wartet auf Clients');
    game.init();
}

wss.on('listening', handleListening);
wss.on('connection', handleConnection);

const ws = {
    updatePlayer
}

export default ws;