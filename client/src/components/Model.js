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

        // Manager przekazany do loadera, pozwala na określenie czy model już się załadował, w klasie Main
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                this.geometry = geometry;
                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.textures), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                this.mesh.position.y = 23.65
                this.box.add(this.mesh)
                console.log(this.geometry.animations, this.textures) // tu powinny być widoczne animacje
            },
        );
    }

    setPosition(x, z) {
        this.container.position.z = x
        this.container.position.y = z
    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}
