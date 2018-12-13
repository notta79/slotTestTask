import Config from "./GameConfig";

let allReels = [];
let tweening = [];
let additionalSpinSymbols = ["10","10","10","10","10"];
let nextSpinSymbols;
let reelContainer;
let callbackReel;
let callbackSpin;
export default class Reel {
    constructor(callbackStopReel, callbackStopSpin) {
        callbackReel = callbackStopReel;
        callbackSpin = callbackStopSpin;

        reelContainer = new PIXI.Container();
        this.createNextSpinSymbols();
    }

    buidSymbolsOnReels(){
        for( let i = 0; i <= 4; i++){
            let symbolContainer = new PIXI.Container();
            symbolContainer.x = i*200;
            reelContainer.addChild(symbolContainer);

            let reel = {
                container: symbolContainer,
                symbols:[],
                position:0,
                previousPosition:0,
                blur: new PIXI.filters.BlurFilter(),
                symbolContainer : symbolContainer
            };
            reel.blur.blurX = 0;
            reel.blur.blurY = 0;
            symbolContainer.filters = [reel.blur];

            for(let j = 0; j <= 4; j++) {
                let symbol = this.addSymbol(i,j);
                reel.symbols.push( symbol );
                symbolContainer.addChild(symbol);
            }
            allReels.push(reel);
        }

        this.addReelMask();
        return reelContainer;
    }

    addSymbol(i,j){
        let name = this.getTexture(i,j);
        let symbol = new PIXI.Sprite(name);
        symbol.scale.x = symbol.scale.y = 0.9;
        symbol.y = j*symbol.height*0.9;
        return symbol;
    }

    createNextSpinSymbols(){
        nextSpinSymbols = [
            [this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol()],
            [this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol()],
            [this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol()],
            [this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol()],
            [this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol(),this.getRandomSymbol()]];
    }

    getRandomSymbol(){
        return Config.symbols[Math.floor(Math.random()*Config.symbols.length)];
    }

    getTexture(i,j){
        let name = (j == 0)?additionalSpinSymbols[j]:nextSpinSymbols[i][j-1];
        if(name){
            return PIXI.Texture.fromImage(`assets/image/symbols/${name}.png`);
        }
        return PIXI.Texture.fromImage(`assets/image/symbols/10.png`);
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
        reelMask.drawRect(reelContainer.x, reelContainer.y+38, 1100, 557);
        reelMask.endFill();

        reelContainer.mask = reelMask;
    }

    startToSpin(){
        this.createNextSpinSymbols();

        for(let i = 0; i < allReels.length; i++){
            let r = allReels[i];
            this.tweenTo(r, "position", r.position + 10+i*5, 1000+i*200, this.backout(0), null, i == allReels.length-1 ? callbackSpin : callbackReel);
        }
    }

    updateSlot(){
        for(let i = 0; i < allReels.length; i++) {
            let r = allReels[i];

            r.blur.blurY = (r.position-r.previousPosition)*8;
            r.previousPosition = r.position;
            for(let j = 0; j < r.symbols.length; j++){
                let s = r.symbols[j];
                let prev = s.y;
                s.y = (r.position + j)%r.symbols.length*(s.height*0.9);
                if(s.y > 600 && j != 0){
                    s.texture = this.getTexture(i,j);
                }
            }
        }

        var now = Date.now();
        var remove = [];
        for(var i = 0; i < tweening.length; i++){
            var t = tweening[i];
            var phase = Math.min(1,(now-t.start)/t.time);

            t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if(t.change) t.change(t);
            if(phase == 1)
            {
                t.object[t.property] = t.target;
                if(t.complete)
                    t.complete(t);
                remove.push(t);
            }
        }
        for(var i = 0; i < remove.length; i++){
            tweening.splice(tweening.indexOf(remove[i]),1);
        }
    }

    tweenTo(object, property, target, time, easing, onchange, oncomplete){
        var tween = {
            object:object,
            property:property,
            propertyBeginValue:object[property],
            target:target,
            easing:easing,
            time:time,
            change:onchange,
            complete:oncomplete,
            start:Date.now()
        };

        tweening.push(tween);
        return tween;
    }

    lerp(a1,a2,t){
        return a1*(1-t) + a2*t;
    }

    backout(amount) {
        return function(t) {
            return (--t*t*((amount+1)*t + amount) + 1);
        };
    };
}