import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    DirectionalLight,
    Color
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
    constructor(container, connectionManager, roomID, numberOfPlayers) {
        console.log('NUM', numberOfPlayers)
        this.isPlayerLeft = numberOfPlayers == 1;

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        //this.renderer = new Renderer( container);
        this.renderer.threeRenderer.autoClear = false
        //this.camera = new Camera(this.renderer.threeRenderer);

        this.camera1 = new Camera(30, window.innerWidth / 2, window.innerHeight);
        this.camera1.position.set(-100,0,0)
        // this.camera1.lookAt(new Vector3(0, 0, 0));

        this.camera2 = new Camera(30, window.innerWidth / 2, window.innerHeight);
        this.camera2.position.set(-100,0,0)
        // this.camera2.lookAt(new Vector3(0, 0, 0));

        this.camVect = new Vector3(-200, 0, 0);

        // CONNECTION
        this.connectionManager = connectionManager;
        this.roomID = roomID;
        this.isLoaded = null
        this.animation = null



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

        this.player = new Model(this.scene, this.manager, this.isPlayerLeft);
        this.player.load(marioMD2);

        this.enemy = new Model(this.scene, this.manager, !this.isPlayerLeft);
        this.enemy.load(marioMD2);



        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };

        this.manager.onLoad = () => {
            this.isLoaded = true;

            this.playerAnimation = new Animation(this.player.mesh)
            this.enemyAnimation = new Animation(this.enemy.mesh)

            this.player.animation = this.playerAnimation;
            this.enemy.animation = this.enemyAnimation;

            this.connectionManager.enemy = this.enemy

            // GUI
            this.gui = new GUI(this.roomID, this.player, this.connectionManager);
            this.connectionManager.gui = this.gui;
            this.playerAnimation.playAnim("crstand")
            this.enemyAnimation.playAnim("crstand")
            this.player.init()
            this.enemy.init()

            // this.keyboard = new Keyboard(window, this.animation, this.player.mesh);

        };

        // PLAYER MANAGERS
        console.log('sss')
        console.log(this.player.ID)
        this.playerManager = new PlayerManager(this.player, this.playerAnimation, this.player.ID);
        this.enemyManager = new PlayerManager(this.enemy, this.playerAnimation, this.enemy.ID);


        this.light = new DirectionalLight(0xffffff, 10);
        this.light.position.set(3, 3, 50);
        this.light.intensity = 2
        this.scene.add(this.light);

        this.views = [
            {
                left: 0,
                bottom: 0,
                width: 0.5,
                height: 1,
                camera: this.camera1
            },
            {
                left: 0.5,
                bottom: 0,
                width: 0.5,
                height: 1,
                camera: this.camera2
            },
        ];
    
        this.render();
    }



    render() {
        // STATS BEGIN
        this.stats.begin()

        // DELTA
        const delta = this.clock.getDelta();
        if (this.playerAnimation) this.playerAnimation.update(delta)
        if (this.enemyAnimation) this.enemyAnimation.update(delta)
        //this.renderer.render(this.scene, this.camera.threeCamera);
        if (this.player.mesh) {

            // if (Config.rotateLeft) {
            //     this.player.mesh.rotation.y += 0.05
            // }

            // if (Config.rotateRight) {
            //     this.player.mesh.rotation.y -= 0.05
            //     console.log('rotate')
            // }

            // if (Config.moveForward) {
            //     //if (this.animation) this.animation.update(delta)
            //    // this.player.mesh.translateX(3)
            // }

            // const camPos = this.camVect.applyMatrix4(this.player.mesh.matrixWorld);
            // this.camera.threeCamera.position.x = camPos.x
            // this.camera.threeCamera.position.y = camPos.y
            // this.camera.threeCamera.position.z = camPos.z

            // this.camera1.position.x = 90
            // this.camera1.position.y = 10
            // this.camera1.position.z = 0

            //const modelVector = new Vector3(this.player.mesh.position.x, this.player.mesh.position.y, this.player.mesh.position.z)
            // this.renderer.threeRenderer.setViewport(0, 0, innerWidth / 2, innerHeight);



            // if (this.player.mesh && this.enemy.mesh) {
            //     this.camera1.lookAt(this.player.mesh.position)
            //     this.camera2.lookAt(this.enemy.mesh.position)
            // }

            // this.views.forEach(view => {
            //     const camera = view.camera;

            // const left = Math.floor(window.innerWidth * view.left);
            // const bottom = Math.floor(window.innerHeight * view.bottom);
            // const width = Math.floor(window.innerWidth * view.width);
            // const height = Math.floor(window.innerHeight * view.height);

            //     this.renderer.threeRenderer.setViewport(left, bottom, width, height);
            //     this.renderer.threeRenderer.setClearColor(new Color(255, 255, 255));
            //     this.renderer.threeRenderer.render(this.scene, view.camera);

            //     this.renderer.threeRenderer.render(this.scene, camera);
            // });
            this.renderer.threeRenderer.setClearColor(0xffffff);
            this.views.forEach(view => {
                const left = Math.floor(window.innerWidth * view.left);
                const bottom = Math.floor(window.innerHeight * view.bottom);
                const width = Math.floor(window.innerWidth * view.width);
                const height = Math.floor(window.innerHeight * view.height);
                this.renderer.threeRenderer.setViewport(left, bottom, width, height);
                this.renderer.threeRenderer.render(this.scene, view.camera);
                view.camera.position.x = 200;
            })

            this.camera1.lookAt(this.player.mesh.position)
            this.camera2.lookAt(this.enemy.mesh.position)
        }

        // STATS END
        this.stats.end()

        requestAnimationFrame(this.render.bind(this));
    }


}