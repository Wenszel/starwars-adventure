import {
    Group, Raycaster, Ray, ArrowHelper, Vector3
} from 'three';
import SocketConnector from './SocketConnector'
import Model from './Model';
import Floor from "./Floor";
import Animation from './Animations';
import Keyboard from './Keyboard';
import Config from './Config';
import Timer from './Timer';

import vaderPath from './models/vader/tris.md2'
import vaderTex from "./models/vader/textures.jpg"
import r2d2Path from "./models/r2d2/tris.md2"
import r2d2Tex from "./models/r2d2/textures.jpg"

export default class Box {
    constructor(scene, manager, modelType, size, paths) {
        this.socketConnector = new SocketConnector();
        this.box = new Group()
        this.scene = scene
        this.manager = manager
        this.modelType = modelType
        this.timer = new Timer(this.socketConnector)
        this.size = size
        this.paths = paths
        //MODELE
        if (this.modelType) {
            this.modelTex = vaderTex
            this.modelPath = vaderPath
            this.stand = "Stand"
            this.run = "Run"
            this.death = "Crdeath"
        } else {
            this.modelTex = r2d2Tex
            this.modelPath = r2d2Path
            this.stand = "stand"
            this.run = "run"
            this.death = "crdeath"
        }

        this.model = new Model(this.scene, this.manager, this.modelTex)
        this.model.load(this.modelPath)
        this.raycaster = new Raycaster()
        this.vector = new Vector3()
        this.path = []
        this.loadModel()
    }

    // MODEL METHODS
    loadModel() {
        this.model = new Model(this.scene, this.manager, this.modelTex, this.box)
        this.model.load(this.modelPath)
        this.animate()
    }
    animate() {
        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };
        this.manager.onLoad = () => {
            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim(this.stand)
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh, this.run, this.stand);
            Config.keyboardLoaded = true
        };
        this.createFloor()
    }

    update(delta) {
        if (this.animation) this.animation.update(delta)
        if (Config.keyboardLoaded)
            this.keyboard.move()
        if ((Config.floorLoaded) && (this.model.mesh) && (Config.cubesLoaded)) {
            let ray = new Ray(this.model.mesh.position, new Vector3(0, -50, 0).normalize())
            this.raycaster.ray = ray
            let intersects = this.raycaster.intersectObjects(this.floor.returnCubesArr());
            if (Config.color) {
                Config.playerBlocked = true
                this.path.forEach(element => {
                    element.material.color.setHex(0xffffaa)
                });
            }
            setTimeout(() => {
                this.path.forEach(element => {
                    element.material.color.setHex(0x0000ff)
                    Config.color = false
                    Config.playerBlocked = false
                    if (!Config.timerStarted) {
                        this.timer.start()
                        Config.timerStarted = true
                    }
                });
            }, 20000)
            if (intersects[0]) {
                if (this.path.includes(intersects[0].object)) {
                    intersects[0].object.material.color.setHex(0x00ff00)
                    if (intersects[0].object.name === "[6,9]") {
                        this.timer.stop()
                        this.timer.getTime()
                        if (Config.gameEndAlert) {
                            //events after the game has ended
                            alert("Koniec")
                            Config.gameEndAlert = false
                            Config.canMove = false
                            Config.played = false
                            this.animation.playAnim(this.stand);
                        }
                    }
                }
                else {
                    //collision
                    intersects[0].object.material.color.setHex(0xff0000)
                    if (Config.played) {
                        this.animation.playAnim(this.stand)
                        Config.canMove = false
                        Config.played = false
                        setTimeout(() => {
                            const { x, y, z } = this.model.mesh.position;
                            this.scene.deathStar.setLaserPosition([x, y, z]);
                            this.scene.deathStar.startLaser();
                            this.scene.deathStar.isLaserOn = true;
                        }, 1000)
                        setTimeout(() => {
                            this.animation.playAnim(this.death);
                        }, 2000)
                        setTimeout(() => {
                            this.model.mesh.position.set(0, 23.65, 0);
                            Config.canMove = true;
                            Config.played = true;
                            this.scene.deathStar.isLaserOn = false;
                            this.scene.deathStar.stopLaser();
                            Config.color = true
                        }, 2700)

                    }
                }
            }
            else {
                //getting out of the map
                if (Config.played) {
                    this.animation.playAnim(this.stand)
                    Config.canMove = false
                    Config.played = false
                    setTimeout(() => {
                        const { x, y, z } = this.model.mesh.position;
                        this.scene.deathStar.setLaserPosition([x, y, z]);
                        this.scene.deathStar.startLaser();
                        this.scene.deathStar.isLaserOn = true;
                    }, 1000)
                    setTimeout(() => {
                        this.animation.playAnim(this.death);
                    }, 2000)
                    setTimeout(() => {
                        this.model.mesh.position.set(0, 23.65, 0);
                        Config.canMove = true;
                        Config.played = true;
                        this.scene.deathStar.isLaserOn = false;
                        this.scene.deathStar.stopLaser();
                    }, 2700)
                }
            }
        }
    }

    //FLOOR METHODS
    createFloor() {
        this.floor = new Floor(this.box, this.size, this.paths)
        // path array
        this.path = this.floor.returnPath()

        Config.floorLoaded = true
        this.scene.add(this.box)
    }

}