import { MD2Loader } from './MD2Loader';
import { Mesh, TextureLoader, MeshPhongMaterial, Object3D } from "three"

export default class Model {
    constructor(scene, manager, texture, box) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.textures = texture
        this.box = box
    }

    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                this.geometry = geometry;
                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.textures), 
                    morphTargets: true
                }))
                this.mesh.position.y = 23.65
                this.box?.add(this.mesh)
            },
        );
    }

    unload() {
        this.scene.remove(this.mesh);
    }
}
