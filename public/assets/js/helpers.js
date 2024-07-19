'use strict';

import settings from "./settings.js";

const helpers = {
    incrementPlayer() {
        settings.activePlayer = (settings.activePlayer + 1) % settings.players.length;
        console.log('Active Player: ', settings.players[settings.activePlayer]);
    }
}

export default helpers;