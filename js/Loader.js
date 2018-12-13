import Config from "./GameConfig.js";

export default class Loader {
    constructor(callback) {
        Config.symbols.forEach(name => PIXI.loader.add(`assets/image/symbols/${name}.png`, `assets/image/symbols/${name}.png`));

        Config.buttonTexture.forEach(name => PIXI.loader.add(name, name));
        PIXI.loader.add(Config.overlayTexture, Config.overlayTexture);
        PIXI.loader.load(callback);
    }
}