import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import deathStartModel from './models/death_star/source/model.glb';
export default class DeathStar{
    constructor(scene) {
        this.scene = scene;
        this.load();
    }
    load(){
        const loader = new GLTFLoader();
        // all files referenced in the gltf file have now also been resolved by your loaders.
        loader.load(deathStartModel, gltf => {
                // called when the resource is loaded
                this.model = gltf.scene;
                this.model.scale.set(0.02, 0.02, 0.02);
                this.model.position.set(-300, 500, -300);
                this.model.lookAt(0,0,0);
                this.scene.add(gltf.scene);
            },
            ( xhr ) => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
    }
}