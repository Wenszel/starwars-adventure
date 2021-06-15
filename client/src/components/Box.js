import {
    Group
} from 'three';
import Model from './Model';
import Floor from "./Floor";
import Animation from './Animations';
import Keyboard from './Keyboard';
export default class Box {
    constructor(scene, manager, modelTex, modelPath) {
        this.box = new Group()
        this.scene = scene
        this.manager = manager
        this.modelTex = modelTex
        this.modelPath = modelPath
        this.keyboardLoaded = false
        this.loadModel()
    }

    // MODEL METHODS
    loadModel() {
        this.model = new Model(this.scene, this.manager, this.modelTex, this.box)
        this.model.load(this.modelPath)
        // this.scene.add(this.box)
        this.animate()
    }
    animate() {
        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };
        this.manager.onLoad = () => {

            // this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")

            // model loaded - można sterować animacjami

            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim("Stand")

            //kawiatura
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);
            this.keyboardLoaded = true
        };
        this.createFloor()
    }
    update(delta) {
        if (this.animation) this.animation.update(delta)
        if (this.keyboardLoaded)
            this.keyboard.move()
    }

    //FLOOR METHODS
    createFloor() {
        this.floor = new Floor(this.box, 20)
        this.scene.add(this.box)
    }



}