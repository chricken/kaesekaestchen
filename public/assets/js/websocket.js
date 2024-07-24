'use strict';

import game from "./game.js";
import settings from "./settings.js";

const socket = new WebSocket("ws://localhost:8000");

const websocket = {
    url: '',
    handleClick(type, x, y) {
        // console.log(type, x, y);
        socket.send(JSON.stringify({
            type: 'handleClick',
            payload: { type, x, y }
        }))

    },
    addPlayer() {
        socket.send(JSON.stringify({
            type: 'addPlayer',
            payload: {}
        }))
    }
}

socket.addEventListener("message", evt => {
    let msg = JSON.parse(evt.data);
    // console.log(msg);
    switch (msg.type) {
        case 'yourIDIs':
            settings.socketID = msg.payload.id;
            break;
        case 'update':
            game.update(msg.payload);
            // console.log(msg.payload);
            break;
        default:
            break;
    }

});

export default websocket;