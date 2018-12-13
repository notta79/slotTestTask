import Loader from "./Loader.js";
import Reel from "./Reel.js";
import GameApp from "./GameApp.js";

const gameApp = new GameApp();
const reel = new Reel();
const loader = new Loader(onAssetsLoaded);

function onAssetsLoaded(){
    let reelContainer = reel.buidSymbolsOnReels();
    gameApp.stage.addChild(reelContainer);

    const overlay = reel.addReelsOverlay();
    gameApp.stage.addChild(overlay);
    overlay.x =  gameApp.stage.width/2 - overlay.width/2+10;
    overlay.y =  gameApp.stage.height/2 - overlay.height/2;

    reelContainer.x =  gameApp.stage.width/2 - reelContainer.width/2;
    reelContainer.y =  gameApp.stage.height/2 - reelContainer.height/2-50;
}