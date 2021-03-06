import {
    Scene, Color, LoadingManager, AxesHelper, AmbientLight, Clock
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import DeathStar from './DeathStar';
import Skybox from './Skybox';
import Renderer from './Renderer';
import Camera from './Camera';

import Box from './Box';


export default class Main {
    constructor(container, size, paths) {

        //scene skeleton
        this.container = container;
        this.scene = new Scene();
        this.size = size
        this.paths = paths

        //scene background
        this.scene.background = new Color(0xffffff);

        //światło
        this.light = new AmbientLight(0x404040, 3);
        this.scene.add(this.light);

        //managers
        this.renderer = new Renderer(container);
        this.manager = new LoadingManager();
        this.manager2 = new LoadingManager();

        this.stats = new Stats();
        this.stats.showPanel(0);
        this.clock = new Clock()

        //camera
        this.width = this.renderer.domElement.width;
        this.height = this.renderer.domElement.height;
        this.camera = new Camera(75, this.width, this.height)
        this.camera.position.set(-600, 1100, 0)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // DeathStar model
        this.deathStar = new DeathStar(this.scene);

        this.skybox = new Skybox(this.scene);
        if (sessionStorage.getItem("character") === "vader") {
            this.character = true
        } else {
            this.character = false
        }
        this.box = new Box(this.scene, this.manager, this.character, this.size, this.paths)

        this.render();
    }

    render() {
        console.log(this.camera.position)
        var delta = this.clock.getDelta();
        this.box.update(delta)
        if (this.deathStar.isLaserOn) {
            this.deathStar.generateLaser();
        } else {
            this.deathStar?.rotateModel();
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}