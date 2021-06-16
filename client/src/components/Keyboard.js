// import Animation from "./Animation"
import Config from "./Config";

const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 83,
};

export default class Keyboard {
    constructor(domElement, animation, modelMesh, run, stand) {
        this.domElement = domElement;
        this.animation = animation
        this.modelMesh = modelMesh
        this.run = run
        this.stand = stand

        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEYS.up:
                if (Config.played) {
                    Config.moveForward = false;
                    this.animation.playAnim(this.stand)
                }
                break;

            case KEYS.left:
                Config.rotateLeft = false;
                break;

            case KEYS.right:
                Config.rotateRight = false;
                break;

            case KEYS.down:
                Config.moveBack = false;
                Config.moved = true
                break;
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
                if (Config.canMove) {
                    Config.moveForward = true;
                    this.animation.playAnim(this.run)
                }
                break;
            case KEYS.left:
                Config.rotateLeft = true;
                break;

            case KEYS.right:
                Config.rotateRight = true;
                break;

            case KEYS.down:
                Config.moveBack = true;
                break;
        }

    }

    move() {
        if (this.modelMesh) {
            if (Config.rotateLeft) {
                this.modelMesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.modelMesh.rotation.y -= 0.05
            }
            if ((Config.moveForward) && (Config.canMove)) {
                this.modelMesh.translateX(0.5)
            }
        }
    }


}
