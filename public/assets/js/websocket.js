'use strict';

import settings from "./settings.js";

const socket = new WebSocket("ws://localhost:8000");

const websocket = {
    url: '',

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
        default:
            break;
    }

});

export default websocket;