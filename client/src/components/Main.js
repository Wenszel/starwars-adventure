import {
    Scene, Color,
} from 'three';
import Skybox from './Skybox';
import Renderer from './Renderer';
import Camera from './Camera';
import Grid from './Grid';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Main {
    constructor(container) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);

        this.scene.background = new Color(0xffffff);
        this.width = this.renderer.domElement.width;
        this.height = this.renderer.domElement.height;
        this.camera = new Camera(75, this.width, this.height)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(10, 50, 10)
        this.skybox = new Skybox(this.scene);
        this.grid = new Grid(this.scene)
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}