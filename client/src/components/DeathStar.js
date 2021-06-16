import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, PointsMaterial, TextureLoader, AdditiveBlending, BufferGeometry, BufferAttribute, Points } from 'three';
// Glb format deathstar model
import deathStartModel from './models/death_star/source/model.glb';
// Texture for laser particle element
import particleTex from '../assets/textures/particle.png';

export default class DeathStar{
    constructor(scene) {
        this.scene = scene;
        this.scene.deathStar = this;
        this.laserPosition = [0, 0, 0];
        this.isLaserOn = false;
        this.load();
    }
    load() {
        const loader = new GLTFLoader();
        // all files referenced in the gltf file have now also been resolved by your loaders.
        loader.load(deathStartModel, gltf => {
                // called when the resource is loaded
                this.model = gltf.scene;
                this.model.scale.set(0.02, 0.02, 0.02);
                this.model.position.set(-300, 500, -300);
                this.model.lookAt(...this.laserPosition);
                this.scene.add(gltf.scene);
            },xhr => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            }, error => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
    }
    startLaser() {
        this.particleMaterial = new PointsMaterial({
            color: 0x00ff00,
            depthWrite: false,
            transparent: true,
            size: 50,
            map: new TextureLoader().load(particleTex),
            blending: AdditiveBlending
        });
        this.particlesGeometry = new BufferGeometry();
        this.mesh = new Points(this.particlesGeometry, this.particleMaterial)
        this.scene.add(this.mesh)
    }
    stopLaser() {
        this.scene.remove(this.mesh);
    }
    generateLaser() {
        this.particlesCount = 1000;
        this.verticesArray = new Float32Array(this.particlesCount * 3); 
        const v1 = new Vector3(-300, 500, -300);
        const v2 = new Vector3(...this.laserPosition);
        const subV = v2.clone().sub(v1.clone());
        const stepV = subV.divideScalar(this.particlesCount);
        for (let i = 0; i < this.particlesCount * 3; i+=3) {
            let x = -300 + (stepV.x *  i/3) + (Math.random() * 4);
            let z = -300 + (stepV.z *  i/3) + (Math.random() * 4);
            let y = 500 + (stepV.y *  i/3) + (Math.random() * 4);
            this.verticesArray[i] = x;
            this.verticesArray[i+1] = y;
            this.verticesArray[i+2] = z;
        }
        this.particlesGeometry.setAttribute("position", new BufferAttribute(this.verticesArray, 3));   
    }
    rotateModel() {
        if(this.model){
            this.model.rotation.x+=0.005;
        }   
    }
    setLaserPosition(playerPosition) {
        this.laserPosition = [...playerPosition];
    }
}