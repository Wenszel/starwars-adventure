import {
    Scene, Color, LoadingManager, AxesHelper, AmbientLight, Clock
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Skybox from './Skybox';
import Renderer from './Renderer';
import Camera from './Camera';
import Grid from './Grid';
import Model from './Model';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Animation from './Animations';
import vaderPath from './models/vader/tris.md2'
import vaderTex from "./models/vader/textures.jpg"

import r2d2Path from "./models/r2d2/tris.md2"
import r2d2Tex from "./models/r2d2/textures.jpg"

import Animate from './Animate';

export default class Main {
    constructor(container) {

        //szkielet sceny
        this.axes = new AxesHelper(1000)
        this.container = container;
        this.scene = new Scene();
        this.grid = new Grid(this.scene)

        //tło sceny
        this.scene.background = new Color(0xffffff);

        //światło
        this.light = new AmbientLight(0x404040); // soft white light
        this.scene.add(this.light);

        //managery ,renderer
        this.renderer = new Renderer(container);
        this.manager = new LoadingManager();
        this.manager2 = new LoadingManager();
        // this.manager2 = new LoadingManager();

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
        this.clock = new Clock()

        //kamera
        this.width = this.renderer.domElement.width;
        this.height = this.renderer.domElement.height;
        this.camera = new Camera(75, this.width, this.height)
        this.camera.position.set(10, 50, 10)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        //model vadera
        this.modelVader = new Model(this.scene, this.manager, vaderTex)
        this.modelVader.load(vaderPath)

        //model r2d2
        this.modelR2D2 = new Model(this.scene, this.manager, r2d2Tex)
        this.modelR2D2.load(r2d2Path)
        this.modelR2D2.setPosition(100, 50)

        this.skybox = new Skybox(this.scene);
        this.grid = new Grid(this.scene)

        // this.animateVader = new Animate(this.manager, this.modelVader, "Stand")
        // this.animateR2D2 = new Animate(this.manager, this.modelR2D2, "stand")

        this.animate()

        this.render();
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

            this.animation = new Animation(this.modelVader.mesh)
            this.animation.playAnim("Stand")
            this.animate2()
            //kawiatura
            // this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };
    }
    animate2() {
        console.log("CHUJ")
        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };
        this.manager.onLoad = () => {

            // this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")

            // model loaded - można sterować animacjami
            this.animation2 = new Animation(this.modelR2D2.mesh)
            this.animation2.playAnim("stand")
            //kawiatura
            // this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };
    }

    render() {
        var delta = this.clock.getDelta();


        if (this.animation) this.animation.update(delta)
        if (this.animation2) this.animation2.update(delta)
        // this.animateVader.update(delta)
        // this.animateR2D2.update(delta)


        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}