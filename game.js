'use strict';

import settings from './settings.js';

class Player {
    constructor() {
        this.id = (Math.random() * 1e17).toString(36)
        while (game.players.some(p => p.id == this.id))
            this.id = (Math.random() * 1e17).toString(36);
    }
}
// Die Felder, die gefüllt werden sollen.
// Wenn die Kanten außen herum ausgefüllt sind, dann muss das Feld
// mit der Farbe des aktuellen Spielers gefüllt werden
// Dazu subscribt das Feld alle vier Kanten. Bei einem Klick auf die Knate wird ein Counter gochgezählt.
// Ist der Counter bei 4 angekommen, so gilt das Feld als gefüllt.
class Feld {
    constructor(x, y) {
        Object.assign(this, { x, y })
        this.player = false;
        this.kanten = 0;
    }
    onChange(player) {
        this.kanten++;
        if (this.kanten >= 4) {
            this.player = player
        }
    }
}
// Die Kanten, die über und unter den Feldern stehen
class Kante {
    constructor(x, y) {
        Object.assign(this, { x, y });
        this.clicked = false;
        this.felder = [];
    }
    onClick(player) {
        this.clicked = player;
        this.felder.forEach(feld => {
            feld.onChange(player);
        })
    }
    subscribeSelected(feld) {
        this.felder.push(feld)
    }
}

// Die Kanten, die links und rechts der Felder stehen
/*
class KanteVert {
    constructor(x, y) {
        Object.assign(this, { x, y });
        this.clicked = false;
    }
    onClick(player) {
        this.clicked = true;
    }
}
    */

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
        // Erstmal alle Kanten erzeugen, weil die Felder bei diesen subscriben soll
        for (let x = 0; x < settings.spielfeldWidth; x++) {
            settings.kantenHorz.push(new Kante(x, settings.spielfeldHeight));
        }
        for (let y = 0; y < settings.spielfeldHeight; y++) {
            for (let x = 0; x < settings.spielfeldWidth; x++) {
                settings.kantenHorz.push(new Kante(x, y));
                settings.kantenVert.push(new Kante(x, y));
            }
            settings.kantenVert.push(new Kante(settings.spielfeldWidth, y));
        }

        // Felder erzeugen und mit den Kanten verknüpfen
        for (let y = 0; y < settings.spielfeldHeight; y++) {
            for (let x = 0; x < settings.spielfeldWidth; x++) {
                let feld = new Feld(x, y);
                settings.felder.push(feld);
                // Kante drüber
                let kante = settings.kantenHorz.find(val => (val.x == x && val.y == y));
                kante.subscribeSelected(feld)
                // Kante drunter
                kante = settings.kantenHorz.find(val => (val.x == x && val.y == y + 1));
                kante.subscribeSelected(feld)
                // Kante links
                kante = settings.kantenVert.find(val => (val.x == x && val.y == y));
                kante.subscribeSelected(feld)
                // Kante rechts
                kante = settings.kantenVert.find(val => (val.x == x + 1 && val.y == y));
                kante.subscribeSelected(feld)
            }
        }

        console.log('Felder', settings.felder);
        console.log('Horz', settings.kantenHorz);
        console.log('Vert', settings.kantenVert);

    },
}

export default game;