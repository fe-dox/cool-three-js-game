import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { Mesh, TextureLoader, MeshPhongMaterial } from "three"
import modelTex from "./assets/mario.jpg"

export default class Model {
    constructor(scene, manager, isPlayerLeft) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.isPlayerLeft = isPlayerLeft;
        this.offset = 60;
    }

    load(path) {

        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(modelTex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))

                this.scene.add(this.mesh);
                console.log(this.geometry.animations) // tu powinny być widoczne animacje
            },
        );
    }

    init() {
 
        if (this.isPlayerLeft) {
            console.log('LEFTTTTT')
            this.mesh.position.z += this.offset;
        }
        else {
            console.log('RIGHTTT')
            this.mesh.position.z -= this.offset;
        }

        //this.mesh.rotation.y = 90 * Math.PI / 180
        // this.mesh.rotation.set(0,-0.01,0)
    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}