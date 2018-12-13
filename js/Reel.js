import Config from "./GameConfig";

let slotTextures = [];
let reelContainer;
export default class Reel {
    constructor() {
        Config.symbols.forEach(name =>slotTextures.push(PIXI.Texture.fromImage(`assets/image/symbols/${name}.png`)));
    }

    buidSymbolsOnReels(){
        let allReels = [];
        reelContainer = new PIXI.Container();
        for( let i = 0; i <= 4; i++){
            let symbolContainer = new PIXI.Container();
            symbolContainer.x = i*200;
            reelContainer.addChild(symbolContainer);

            let reel = {
                container: symbolContainer,
                symbols:[],
                position:0,
                previousPosition:0,
                blur: new PIXI.filters.BlurFilter()
            };
            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            symbolContainer.filters = [reel.blur];

            for(let j = 0; j <= 4; j++) {
                let symbol = this.addSymbol(j);
                reel.symbols.push( symbol );
                symbolContainer.addChild(symbol);
            }
            allReels.push(reel);
        }

        this.addReelMask();
        return reelContainer;
    }

    addSymbol(index){
        let symbol = new PIXI.Sprite(slotTextures[ Math.floor(Math.random()*slotTextures.length)]);
        symbol.scale.x = symbol.scale.y = 0.9;
        symbol.y = index*symbol.height*0.9;
        return symbol;
    }

    addReelsOverlay(target){
        let overlay = new PIXI.Sprite(PIXI.Texture.fromImage('assets/image/slotOverlay.png'));
        overlay.width = 1100;
        overlay.height = 614;
        return overlay;
    }

    addReelMask(){
        var reelMask = new PIXI.Graphics();
        reelMask.beginFill(0xFF0000, 1.0);
        reelMask.drawRect(reelContainer.x, reelContainer.y+60, 1100, 600);
        reelMask.endFill();

        reelContainer.mask = reelMask;
    }
}