import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
//import Ico from './Ico';

export default class Main {
    constructor(container) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        //this.ico = new Ico(this.scene);

        this.render();
    }

    render() {

        this.renderer.render(this.scene, this.camera.threeCamera);
        //this.ico.update() 

        requestAnimationFrame(this.render.bind(this));
    }
}