'use strict';

class Player {
    constructor() {
        this.id = (Math.random() * 1e17).toString(36)
        while (game.players.some(p => p.id == this.id))
            this.id = (Math.random() * 1e17).toString(36);
    }
}

const game = {
    players: [],
    size: 20,
    incrementPlayer() {
        settings.activePlayer = (settings.activePlayer + 1) % settings.players.length;
        console.log('Active Player: ', settings.players[settings.activePlayer]);
    },
    removePlayer(payload) {

    },
    addPlayer(callback, socket) {
        console.log('player added');
        let player = new Player()
        game.players.push(player);

        callback(player.id, socket);
    },
    nextPlayer(payload) {

    },
    init() {

    },
}

export default game;