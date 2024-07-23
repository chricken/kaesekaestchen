'use strict';
import websocket from './websocket.js';

const game = {
    update(data){
        console.log(data);
    },
    init() {
        console.log('init');
        websocket.addPlayer();
    }
}

export default game;