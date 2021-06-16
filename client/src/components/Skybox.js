import { BackSide, TextureLoader, MeshBasicMaterial, BoxGeometry, Mesh } from 'three';
import bk from '../assets/skybox/corona_bk.png';
import dn from '../assets/skybox/corona_dn.png';
import ft from '../assets/skybox/corona_ft.png';
import lf from '../assets/skybox/corona_lf.png';
import rt from '../assets/skybox/corona_rt.png';
import up from '../assets/skybox/corona_up.png';

export default class Skybox {
    constructor(scene) {
        this.imagesArray = [ft, bk, up, dn, rt, lf];
        this.materialArray = this.createMaterialArray();
        this.skyboxGeo = new BoxGeometry(10000, 10000, 10000);
        this.skybox = new Mesh(this.skyboxGeo, this.materialArray);
        scene.add(this.skybox);
    }
    createMaterialArray() {
        const materialArray = this.imagesArray.map(image => {
            let texture = new TextureLoader().load(image);
            return new MeshBasicMaterial({ map: texture, side: BackSide });
        });
        return materialArray;
      }
}