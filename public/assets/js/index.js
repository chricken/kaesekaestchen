'use strict';

import dom from './dom.js';

// KONSTANTEN / VARIABLEN


const init = () => {
    dom.mapping();
    dom.appendEventListeners();
    dom.handleResize();
}

// INIT
init();