import {
    Scene, Color, LoadingManager, AxesHelper, AmbientLight
} from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Grid from './Grid';
import Model from './Model';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vaderPath from './models/vader/tris.md2'
import vaderTex from "./models/vader/textures.jpg"

import r2d2Path from "./models/r2d2/tris.md2"
import r2d2Tex from "./models/r2d2/textures.jpg"

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
        this.manager = new LoadingManager()

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

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}