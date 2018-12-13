import Loader from "./Loader.js";
import Reel from "./Reel.js";
import GameApp from "./GameApp.js";
import Controls from "./Controls.js";
import SoundManager from "./SoundManager.js";

const gameApp = new GameApp();
const reel = new Reel(stopReel, stopSpin);
const loader = new Loader(onAssetsLoaded);
const controls = new Controls();
const sounds = new SoundManager();

let isRuning = false;
function onAssetsLoaded(){
    let reelContainer = reel.buidSymbolsOnReels();
    gameApp.stage.addChild(reelContainer);

    const overlay = reel.addReelsOverlay();
    gameApp.stage.addChild(overlay);
    overlay.x =  gameApp.stage.width/2 - overlay.width/2+10;
    overlay.y =  gameApp.stage.height/2 - overlay.height/2;

    reelContainer.x =  gameApp.stage.width/2 - reelContainer.width/2;
    reelContainer.y =  gameApp.stage.height/2 - reelContainer.height/2-60;

    gameApp.stage.addChild(controls.spinButton);
    controls.spinButton.x = 990;
    controls.spinButton.y = 680;

    controls.spinButton.on("pointerdown", startSpinReels);

    gameApp.app.ticker.add(function(delta) {
        if(isRuning)
            reel.updateSlot();
    });
}

function startSpinReels(){
    if(isRuning)
        return;

    isRuning = true;

    sounds.reelSpinSoundPlay();

    controls.disableButton();
    reel.startToSpin();
}

function stopSpin(){
    isRuning = false;

    controls.enableButton();
    sounds.reelSpinSoundStop();
}

function stopReel(){
    sounds.reelSpinStopPlay();
}