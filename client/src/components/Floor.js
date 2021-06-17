import {
    BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, DoubleSide
} from 'three';
import Config from './Config';
import Paths from './Paths';
export default class Floor {
    constructor(box, size) {
        this.box = box
        this.size = size
        this.cubesArr = []
        this.pathArr = []
        this.paths = Paths
        this.pathNumber = Math.floor(Math.random() * 3);
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
            }
        }
        this.randomPath()
        Config.cubesLoaded = true

        let planeGeometry = new PlaneGeometry(900, 900)
        let planeMaterial = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide })
        let plane = new Mesh(planeGeometry, planeMaterial)
        plane.visible = false
        plane.position.x = 410
        plane.position.y = -2
        plane.position.z = 410
        plane.rotation.x = Math.PI / 2;
        this.box.add(plane)
        this.pathArr.push(plane)
        this.cubesArr.push(plane)
    }
    randomPath() {
        this.cubesArr.forEach(element => {
            if (Paths.returnPath(this.pathNumber).includes(element.name))
                this.pathArr.push(element)
        });
    }
    returnCubesArr() {
        return this.cubesArr
    }
    returnPath() {
        return this.pathArr
    }
}