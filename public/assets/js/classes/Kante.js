'use strict';

import settings from "../settings.js";

class Kante {
    constructor(kaestchen = []) {
        Object.assign(this, { kaestchen });
        this.checked = false;
    }
    onClick(){
        this.checked = settings.activePlayer;
        
    }
}

export default Kante;