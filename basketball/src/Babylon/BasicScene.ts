import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, DirectionalLight, LightGizmo, GizmoManager, Light, SceneLoader, CannonJSPlugin, PhysicsImpostor} from '@babylonjs/core';
import "@babylonjs/loaders";
import * as CANNON from 'cannon';

export class BasicScene {

    scene: Scene;
    engine: Engine;
 

    constructor(private canvas:HTMLCanvasElement){

        this.engine = new Engine(this.canvas, true);
        this.engine.displayLoadingUI();
        this.scene = this.CreateScene();
        this.CreateEnvironment();
        this.CreateController();
        this.CreateImposters();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    CreateScene(): Scene {
    
        const scene = new Scene(this.engine);
        scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON));
        this.CreateLights();
        scene.onPointerDown = (evt) => {
            if (evt.button === 0) this.engine.enterPointerlock();
            if (evt.button === 1) this.engine.exitPointerlock();
          };

        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;

        return scene;
    }

    async CreateEnvironment(): Promise<void> {

        // const ball = MeshBuilder.CreateSphere("sphere1", {diameter:0.24, segments:32}, this.scene);
        // ball.position.y = 1;

        // const ground = MeshBuilder.CreateGround("ground", {width: 19, height: 32}, this.scene);

        // ball.material = this.CreateBallMaterial();
        // ground.material = this.CreateGroundMaterial();
        
        const { meshes } = await SceneLoader.ImportMeshAsync(null, "./models/level.glb", "", this.scene);
    
        meshes.map((mesh) => {
          mesh.checkCollisions = true;
        });

        this.engine.hideLoadingUI();
    }

    // CreateEnvironment(): void {
    // }

    CreateBallMaterial(): StandardMaterial {
        const BallMat = new StandardMaterial("BallMat", this.scene);
        const ballDiffuse = new Texture("./textures/BasketBall/BasketBallTexture.png", this.scene);

        BallMat.diffuseTexture = ballDiffuse;

        return BallMat;
    }

    CreateGroundMaterial(): StandardMaterial {
        const GroundMat = new StandardMaterial("GroundMat", this.scene);

        const groundDiffuse = new Texture("./textures/BasketBall/BasketBallCourtTexture.jpg", this.scene);

        GroundMat.diffuseTexture = groundDiffuse;


        return GroundMat;
    }

    CreateLights(): void {

        const Light1 = new HemisphericLight("light", new Vector3(0, -1, 0), this.scene);
        Light1.intensity = 0.7;

        const Light2 = new DirectionalLight("light", new Vector3(0, -1, 0), this.scene);
        Light2.intensity = 2;

        // this.CreateGizmos(Light);
    }
  
    CreateGizmos(customLight: Light): void {
      const lightGizmo = new LightGizmo();
      lightGizmo.scaleRatio = 2;
      lightGizmo.light = customLight;
  
      const gizmoManager = new GizmoManager(this.scene);
      gizmoManager.positionGizmoEnabled = true;
      gizmoManager.rotationGizmoEnabled = true;
      gizmoManager.usePointerToAttachGizmos = false;
      gizmoManager.attachToMesh(lightGizmo.attachedMesh);
    }

    CreateController(): void {
        const camera = new FreeCamera("camera", new Vector3(13.6, 1, -5), this.scene);
        camera.attachControl();
    
        camera.applyGravity = false;
        camera.checkCollisions = true;
    
        camera.ellipsoid = new Vector3(0.1, 0.1, 0.1);
    
        camera.minZ = 0.1;
        camera.speed = 0.1;
        camera.angularSensibility = 2000;
    
        camera.keysUp.push(87);
        camera.keysLeft.push(65);
        camera.keysDown.push(83);
        camera.keysRight.push(68);
        camera.keysDownward.push(81);
        camera.keysUpward.push(69);
    }

    CreateImposters(): void {
        // const box = MeshBuilder.CreateBox("box", {size: 2});
        // box.position = new Vector3(0, 10, 0);
        // box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, {mass: 1, restitution: 1}, this.scene);

        const ball = MeshBuilder.CreateSphere("sphere1", {diameter:0.24, segments:32});
        ball.position = new Vector3(13.6, 6, 0);
        ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, {mass: 0.5, restitution: 0.8}, this.scene);

        ball.material = this.CreateBallMaterial();

        const ground = MeshBuilder.CreateGround("ground", {width: 32, height: 19});
        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.5}, this.scene);

        ground.isVisible = false;
    }
}