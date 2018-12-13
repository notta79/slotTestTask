import GameConfig from "./GameConfig.js";

let reelSpinSound;
let reelStopSound;
export default class SoundManager {
    constructor() {
        reelSpinSound = new Howl({
            src: GameConfig.soundInstName.spin,
            loop: true
        });

        reelStopSound = new Howl({
            src: GameConfig.soundInstName.stopSpin,
        });
    }

    reelSpinSoundPlay(){
        reelSpinSound.play();
    }

    reelSpinSoundStop(){
        reelSpinSound.stop();
    }

    reelSpinStopPlay(){
        reelStopSound.play();
    }
}