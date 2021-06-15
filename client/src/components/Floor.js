import {
    BoxGeometry, MeshNormalMaterial, Mesh
} from 'three';
export default class Floor {
    constructor(box, size) {
        this.box = box
        this.size = size

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cubeGeometry = new BoxGeometry(60, 6, 60)
                let cubeMaterial = new MeshNormalMaterial()
                let cube = new Mesh(cubeGeometry, cubeMaterial)
                cube.position.x += (i * 65)
                cube.position.z += (j * 65)
                cube.position.y = -3
                this.box.add(cube)
            }
        }
    }
}