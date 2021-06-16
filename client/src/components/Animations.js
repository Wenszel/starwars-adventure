import { AnimationMixer, LoopOnce } from 'three';

export default class Animation {
    constructor(mesh) {
        this.mesh = mesh;
        this.mixer = new AnimationMixer(this.mesh);
    }

    playAnim(animName) {
        this.animName = animName
        this.mixer.uncacheRoot(this.mesh)

        if ((this.animName === 'crdeath') || (this.animName === 'Crdeath'))
            this.mixer.clipAction(this.animName).play().setLoop(LoopOnce, 1)
        else
            this.mixer.clipAction(this.animName).play()

    }

    update(delta) {
        this.mixer?.update(delta);

    }
}