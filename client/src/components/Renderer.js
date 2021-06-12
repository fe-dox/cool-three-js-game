import { WebGLRenderer,Color } from 'three';

export default class Renderer {
    constructor(scene, container) {

        this.scene = scene;
        // this.scene.background = new Color( 0xffffff );
        this.container = container;
        this.threeRenderer = new WebGLRenderer({ antialias: true });
        this.threeRenderer.setClearColor(0xffffff,0);
        this.container.appendChild(this.threeRenderer.domElement);
        this.updateSize();

        document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(scene, camera) {
        this.threeRenderer.render(scene, camera);
    }
}
// import { WebGLRenderer } from 'three';

// export default class Renderer extends WebGLRenderer {
//     constructor(container) {
//         super({ antialias: true })

//         this.container = container

//         this.container.appendChild(this.domElement);

//         // resize
//         this.updateSize();
//         document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
//         window.addEventListener('resize', () => this.updateSize(), false);
//     }

//     updateSize() {
//         this.setSize(window.innerWidth, window.innerHeight);
//     }
// }