import GameConfig from "./GameConfig.js";

let app;
export default class GameApp {
    constructor() {
        app = new PIXI.Application(GameConfig.gameSize.width, GameConfig.gameSize.height, {transparent: true});
        if(document.querySelector('#frame'))document.querySelector('#frame').appendChild(app.view);

        let ratio = GameConfig.gameSize.width/GameConfig.gameSize.height;
        window.addEventListener('resize', resize);

        resize();

        function resize(){
            const scaleFactor = Math.min(
                window.innerWidth / 1200,
                window.innerHeight / 900
            );
            const newWidth = Math.ceil(1200 * scaleFactor);
            const newHeight = Math.ceil(900 * scaleFactor);

            app.view.style.width = `${newWidth}px`;
            app.view.style.height = `${newHeight}px`;
        }

    }

    get stage(){
        return app.stage;
    }
}