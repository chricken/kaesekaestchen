'use strict';
import dom from './dom.js';
import settings, { elements } from './settings.js';
import websocket from './websocket.js';

const components = {
    feld(feld, numCols, numRows) {
        let w = settings.vpWidth / numCols;
        let h = settings.vpHeight / numRows;
        let size = Math.floor(Math.min(w, h));
        // console.log(feld);
        let elFeld = dom.create({
            cssClassName: 'feld',
            parent: elements.main,
            styles: {
                width: size - settings.innerPadding + 'px',
                height: size - settings.innerPadding + 'px',
                left: feld.x * size + (settings.outerPadding / 2) + 'px',
                top: feld.y * size + (settings.outerPadding / 2) + 'px',
            }
        })

        if (feld.player !== false) {
            elFeld.classList.add('filled', `filledBy${feld.player}`);
        }
    },
    kanteHorz(kante, numCols, numRows) {
        let w = settings.vpWidth / numCols;
        let h = settings.vpHeight / numRows;
        let size = Math.floor(Math.min(w, h));
        // console.log(kante);
        let elKante = dom.create({
            cssClasses: ['kanteHorz'],
            parent: elements.main,
            styles: {
                width: size - (settings.innerPadding * 2) + 'px',
                height: settings.innerPadding + 'px',
                left: kante.x * size + (settings.outerPadding / 2) + (settings.innerPadding / 2) + 'px',
                top: kante.y * size + (settings.outerPadding / 2) - settings.innerPadding + 'px',
            },
            listeners: {
                click() {
                    // console.log('horz', kante.x, kante.y);
                    websocket.handleClick('horz', kante.x, kante.y)
                }
            }
        })
        if (kante.clicked !== false) {
            elKante.classList.add('clicked', `clickedBy${kante.clicked}`);
        }
    },
    kanteVert(kante, numCols, numRows) {
        let w = settings.vpWidth / numCols;
        let h = settings.vpHeight / numRows;
        let size = Math.floor(Math.min(w, h));
        // console.log(kante);
        let elKante = dom.create({
            cssClasses: ['kanteVert'],
            parent: elements.main,
            styles: {
                height: size - (settings.innerPadding * 2) + 'px',
                width: settings.innerPadding + 'px',
                left: kante.x * size + (settings.outerPadding / 2) - settings.innerPadding + 'px',
                top: kante.y * size + (settings.outerPadding / 2) + (settings.innerPadding / 2) + 'px',
            },
            listeners: {
                click() {
                    // console.log('vert', kante.x, kante.y);
                    websocket.handleClick('vert', kante.x, kante.y)
                }
            }
        })
        if (kante.clicked !== false) {
            elKante.classList.add('clicked', `clickedBy${kante.clicked}`);
        }

    }
}

export default components;