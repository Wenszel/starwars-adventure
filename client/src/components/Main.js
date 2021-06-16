import {
    Scene, Color, LoadingManager, AxesHelper, AmbientLight, Clock
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import DeathStar from './DeathStar';
import Skybox from './Skybox';
import Renderer from './Renderer';
import Camera from './Camera';
import Grid from './Grid';

import Box from './Box';

import Timer from './Timer';
export default class Main {
    constructor(container) {

        //szkielet sceny
        this.axes = new AxesHelper(1000)
        this.container = container;
        this.scene = new Scene();
        this.scene.add(this.axes)
        //tło sceny
        this.scene.background = new Color(0xffffff);

        //światło
        this.light = new AmbientLight(0x404040, 3); // soft white light
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

        // DeathStar model
        this.deathStar = new DeathStar(this.scene);

        this.skybox = new Skybox(this.scene);
        this.grid = new Grid(this.scene)

        this.box = new Box(this.scene, this.manager, true)

        this.timer = new Timer()
        this.render();
    }

    render() {
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