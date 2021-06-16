import {
    Group, Raycaster, Ray, ArrowHelper, Vector3
} from 'three';
import Model from './Model';
import Floor from "./Floor";
import Animation from './Animations';
import Keyboard from './Keyboard';
import Config from './Config';
export default class Box {
    constructor(scene, manager, modelTex, modelPath, modelType) {
        this.box = new Group()
        this.scene = scene
        this.manager = manager

        this.modelTex = modelTex
        this.modelPath = modelPath
        this.modelType = modelType

        if (this.modelType) {
            this.stand = "Stand"
            this.run = "Run"
            this.death = "Crdeath"
        } else {
            this.stand = "stand"
            this.run = "run"
            this.death = "crdeath"
        }
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
        if ((Config.floorLoaded) && (this.model.mesh)) {
            let ray = new Ray(this.model.mesh.position, new Vector3(0, -50, 0).normalize())
            this.raycaster.ray = ray
            let intersects = this.raycaster.intersectObjects(this.floor.returnCubesArr());

            if (intersects[0]) {
                if (this.path.includes(intersects[0].object))
                    intersects[0].object.material.color.setHex(0x00ff00)

                else {
                    //collision
                    intersects[0].object.material.color.setHex(0xff0000)
                    if (Config.played) {
                        this.animation.playAnim(this.stand)
                        Config.canMove = false
                        Config.played = false
                        setTimeout(() => {
                            const {x, y, z} = this.model.mesh.position;
                            this.scene.deathStar.setLaserPosition([x,y,z]);
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
    }

    //FLOOR METHODS
    createFloor() {
        this.floor = new Floor(this.box, 10)
        //tablica ścieżki
        this.path = this.floor.returnPath()
        Config.floorLoaded = true
        this.scene.add(this.box)
    }

}