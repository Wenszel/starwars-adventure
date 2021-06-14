import Animation from './Animations';
export default class Animate {
    constructor(manager, mesh, anim) {

        this.mesh = mesh;
        this.manager = manager
        this.anim = anim
        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };
        this.manager.onLoad = () => {

            // this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")

            // model loaded - można sterować animacjami

            this.animation = new Animation(this.mesh.mesh)
            this.animation.playAnim(this.anim)
            //kawiatura
            // this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };
    }

    update(delta) {
        if (this.animation) this.animation.update(delta)
    }


}