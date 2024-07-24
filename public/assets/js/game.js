'use strict';
import websocket from './websocket.js';
import components from './components.js';

const game = {
    update(data) {
        // console.log(data);
        data.felder.forEach(feld => {
            // console.log(feld);
            components.feld(feld, data.width, data.height);
        })
        data.kantenHorz.forEach(kante => {
            components.kanteHorz(kante, data.width, data.height);  
        })
        data.kantenVert.forEach(kante => {
            components.kanteVert(kante, data.width, data.height);  
        })
    },
    init() {
        console.log('init');
        websocket.addPlayer();
    }
}

export default game;