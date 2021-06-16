import {
    BoxGeometry, MeshBasicMaterial, Mesh
} from 'three';
export default class Floor {
    constructor(box, size) {
        this.box = box
        this.size = size
        this.cubesArr = []
        this.pathArr = []

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cubeGeometry = new BoxGeometry(80, 6, 80)
                let cubeMaterial = new MeshBasicMaterial({ color: 0x0000ff })
                let cube = new Mesh(cubeGeometry, cubeMaterial)
                cube.name = `[${i},${j}]`
                cube.position.x += (i * 90)
                cube.position.z += (j * 90)
                cube.position.y = -3
                this.box.add(cube)
                this.cubesArr.push(cube)
                if (j < 2)
                    this.pathArr.push(cube)
            }
        }

    }
    returnCubesArr() {
        return this.cubesArr
    }
    returnPath() {
        return this.pathArr
    }
}