import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh, DoubleSide,
} from "three";
export default class Plane {

    constructor(scene) {

        this.scene = scene;

        let groundCounter = 20;

        for (let i = -20; i < groundCounter; i++) {
            for (let j = -20; j < groundCounter; j++) {
                const ground = new Cube(this.scene, i, j);
            }
        }

    }

}

class Cube {

    constructor(scene, x, z) {
        this.size = 20;
        this.scene = scene;

        
        const geometry = new BoxGeometry(this.size, this.size, this.size);
        const material = new MeshBasicMaterial({
            color: 0x883344,
            side: DoubleSide,
            // wireframe: true,
            transparent: false,
            opacity: 1
        });
        this.mesh = new Mesh(geometry, material);
        this.mesh.position.x = this.size * x;
        this.mesh.position.z = this.size * z;
        this.mesh.position.y = -50;
        this.scene.add(this.mesh);
    }
    update() {
        // this.mesh.rotation.y += 0.01
    }

}



// class Cube {

//     constructor(scene, x, z) {
//         this.size = 20;
//         this.scene = scene;

//         this.materials = [];

//         for (let i = 0; i < 6; i++) {
//             this.materials.push(new MeshBasicMaterial({
//                 side: DoubleSide,
//                 map: new TextureLoader().load(ground)
//             }));
//         }

//         const geometry = new BoxGeometry(this.size, this.size, this.size);
//         const material = new MeshBasicMaterial({
//             color: 0x000000,
//             side: DoubleSide,
//             // wireframe: true,
//             transparent: false,
//             opacity: 1
//         });
//         this.mesh = new Mesh(geometry, this.materials);
//         this.mesh.position.x = this.size * x;
//         this.mesh.position.z = this.size * z;
//         this.mesh.position.y = -50;
//         this.scene.add(this.mesh);
//     }
//     update() {
//         // this.mesh.rotation.y += 0.01
//     }

// }

