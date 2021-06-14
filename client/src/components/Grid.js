import {
    GridHelper,
} from "three";

export default class Grid {

    constructor(scene) {
        this.scene = scene
        this.gridHelper = new GridHelper(1000, 100)
        this.scene.add(this.gridHelper)
    }

}
