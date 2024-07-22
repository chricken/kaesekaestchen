'use strict';
import websocket from './websocket.js';

const game = {
    
    init() {
        console.log('init');
        websocket.addPlayer();
    }
}

export default game;