export default class GameConfig {
    static get gameSize(){
        return {width:1200, height:920};
    }

    static get symbols(){
        return ["01","02","03","04","05","06","07","08","09","10","11","12","13"];
    }

    static get overlayTexture(){
        return "assets/image/slotOverlay.png";
    }

    static get buttonTexture(){
        return ["assets/image/controls/btn_spin_normal.png", "assets/image/controls/btn_spin_hover.png",
                "assets/image/controls/btn_spin_pressed.png", "assets/image/controls/btn_spin_disable.png"];
    }
    static get soundInstName(){
        return ["assets/sound/Reel_Spin.mp3", "assets/sound/Landing_1.mp3"];
    }
};