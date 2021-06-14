import {
    Scene,
} from 'three';


export default class Main {
    constructor(container) {
        this.scene = new Scene();
        this.render();
    }
    render() {
        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }
}