import {
    GridHelper,
} from "three";

export default class Grid {

    constructor(scene) {
        this.scene = scene
        this.gridHelper = new GridHelper(5000, 500)
        this.scene.add(this.gridHelper)
    }
}
