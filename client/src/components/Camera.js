// import { PerspectiveCamera, Vector3 } from 'three';

// export default class Camera {
//     constructor(renderer) {
//         const width = renderer.domElement.width;
//         const height = renderer.domElement.height;

//         this.threeCamera = new PerspectiveCamera(75, width / height, 0.1, 10000);
//         this.threeCamera.position.set(2, 2, 2);
//         this.threeCamera.lookAt(new Vector3(0, 0, 0))
//         // this.threeCamera.rotation.y = 90 * Math.PI / 180
//         this.updateSize(renderer);

//         window.addEventListener('resize', () => this.updateSize(renderer), false);
//     }

//     updateSize(renderer) {

//         this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;
//         this.threeCamera.updateProjectionMatrix();
//     }
// }

import { PerspectiveCamera, Vector3 } from 'three';


export default class Camera extends PerspectiveCamera {
    constructor(fov, width, height) {        
        super(fov, width / height, 0.1, 10000)    
        
        this.width = width
        this.height = height
        this.updateSize();
        // resize
        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        // aspect ratio kamery
        this.aspect = this.width / this.height;
        this.updateProjectionMatrix();
    }


}