import Config from "./GameConfig";

let button;
let spinButtonTextures = {};
let isDisable;
let isOver;
export default class Controls {
    constructor() {
        this.initSpinButton();
    }

    initSpinButton(){
        spinButtonTextures.normal = PIXI.Texture.fromImage(Config.buttonTexture[0]);
        spinButtonTextures.down = PIXI.Texture.fromImage(Config.buttonTexture[2]);
        spinButtonTextures.over = PIXI.Texture.fromImage(Config.buttonTexture[1]);
        spinButtonTextures.disable = PIXI.Texture.fromImage(Config.buttonTexture[3]);

        button = new PIXI.Sprite(spinButtonTextures.normal);
        button.anchor.set(0.5);
        button.interactive = true;
        button.buttonMode = true;

        this.addTextOnSpin();

        button
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    onButtonDown() {
        button.texture = spinButtonTextures.down;

        isDisable = true;
    }

    onButtonUp() {
        if(isDisable)
            return;

        if (isOver) {
            button.texture = spinButtonTextures.over;
        }
        else {
            button.texture = spinButtonTextures.normal;
        }
    }

    onButtonOver() {
        if(isDisable)
            return;

        isOver = true;

        button.texture = spinButtonTextures.over;
    }

    onButtonOut() {
        if(isDisable)
            return;

        isOver = false;
        button.texture = spinButtonTextures.normal;
    }

    addTextOnSpin(){
        let style = new PIXI.TextStyle({
            fontFamily: 'IMPACT',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff', '#cccccc'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });
        var text = new PIXI.Text("SPIN", style);
        text.anchor = new PIXI.Point(0.5, 0.5);
        button.addChild(text);
    }

    disableButton(){
        isDisable = true;
        button.texture = spinButtonTextures.disable;
    }

    enableButton() {
        isDisable = false;
        button.texture = spinButtonTextures.normal;

        if (isOver) {
            button.texture = spinButtonTextures.over;
        }
        else {
            button.texture = spinButtonTextures.normal;
        }
    }

    get spinButton(){
        return button;
    }
}