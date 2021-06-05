import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    DirectionalLight
} from 'three';
import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Model from "./Model"
import marioMD2 from "./assets/mario.md2";
import Animation from './Animation';
import GUI from './GUI';
import PlayerManager from './PlayerManager';
import ConnectionManager from './ConnectionManager';

export default class Main {
    constructor(container, connectionManager,roomID) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.camVect = new Vector3(-200, 0, 0);

        // CONNECTION
        this.connectionManager = connectionManager;
        this.roomID = roomID;
        this.isLoaded = null
        this.animation = null

        // GUI
        this.gui = new GUI(this.roomID);

        // GRID HELPER
        const gridHelper = new GridHelper(1000, 10);
        this.scene.add(gridHelper);

        // STATS
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);

        // CLOCK
        this.clock = new Clock()

        // LOADING MANAGER
        this.manager = new LoadingManager();

        this.player1 = new Model(this.scene, this.manager, 1);
        this.player1.load(marioMD2);

        this.player2 = new Model(this.scene, this.manager, 2);
        this.player2.load(marioMD2);

        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };

        this.manager.onLoad = () => {
            this.isLoaded = true;

            this.player1Animation = new Animation(this.player1.mesh)
            this.player2Animation = new Animation(this.player2.mesh)

            this.player1Animation.playAnim("crstand")
            this.player2Animation.playAnim("crstand")
            this.player1.init()
            this.player2.init()

            // this.keyboard = new Keyboard(window, this.animation, this.player1.mesh);

        };

        // PLAYER MANAGERS
        console.log('sss')
        console.log(this.player1.ID)
        this.player1Manager = new PlayerManager(this.player1, this.player1Animation, this.player1.ID);
        this.player2Manager = new PlayerManager(this.player2, this.player1Animation, this.player2.ID);


        this.light = new DirectionalLight(0xffffff, 10);
        this.light.position.set(3, 3, 50);
        this.light.intensity = 2
        this.scene.add(this.light);
        this.counter = 0
        this.render();
    }

    render() {
        // STATS BEGIN
        this.stats.begin()

        // DELTA
        const delta = this.clock.getDelta();
        if (this.player1Animation) this.player1Animation.update(delta)
        if (this.player2Animation) this.player2Animation.update(delta)
        this.renderer.render(this.scene, this.camera.threeCamera);

        if (this.player1.mesh) {

            // if (Config.rotateLeft) {
            //     this.player1.mesh.rotation.y += 0.05
            // }

            // if (Config.rotateRight) {
            //     this.player1.mesh.rotation.y -= 0.05
            //     console.log('rotate')
            // }

            // if (Config.moveForward) {
            //     //if (this.animation) this.animation.update(delta)
            //    // this.player1.mesh.translateX(3)
            // }

            // const camPos = this.camVect.applyMatrix4(this.player1.mesh.matrixWorld);
            // this.camera.threeCamera.position.x = camPos.x
            // this.camera.threeCamera.position.y = camPos.y
            // this.camera.threeCamera.position.z = camPos.z

            this.camera.threeCamera.position.x = 90
            this.camera.threeCamera.position.y = 10
            this.camera.threeCamera.position.z = 0

            //const modelVector = new Vector3(this.player1.mesh.position.x, this.player1.mesh.position.y, this.player1.mesh.position.z)
            // this.camera.threeCamera.lookAt(this.player1.mesh.position)
            this.camera.threeCamera.lookAt(new Vector3(0, 0, 0))
        }

        // STATS END
        this.stats.end()

        requestAnimationFrame(this.render.bind(this));
    }


}