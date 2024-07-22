'use strict';

import { elements } from './settings.js';
import game from './game.js';

// KONSTANTEN / VARIABLEN

// FUNKTIONEN
const domMapping = () => {
    elements.btn = document.querySelector('#btn');
}

const appendEventlisteners = () => {
    elements.btn.addEventListener('click', game.init);
}

const init = () => {
    domMapping();
    appendEventlisteners();

}

// INIT
init();