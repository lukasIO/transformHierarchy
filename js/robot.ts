import "lib/three";
import "lib/OrbitControls";
import * as dat from "lib/dat.gui.min";
import { Scenegraph2D } from "scenegraph";


export class Robot {

    constructor() {

    }
    sceneGraph: Scenegraph2D;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;

    //robot parts - Object3D used as transform nodes
    robot: THREE.Group = new THREE.Group();

    translateLegLeft = new THREE.Object3D();
    translateLegRight = new THREE.Object3D();

    scaleLegsLeft = new THREE.Object3D();
    scaleLegsRight = new THREE.Object3D();

    legAndFootLeft = new THREE.Object3D();
    legAndFootRight = new THREE.Object3D();

    translateLegAndFootLeft = new THREE.Object3D();
    translateLegAndFootRight = new THREE.Object3D();

    translateFootLeft = new THREE.Object3D();
    translateFootRight = new THREE.Object3D();


    legLeft: THREE.Mesh;
    legRight: THREE.Mesh;

    footLeft: THREE.Mesh;
    footRight: THREE.Mesh;

    gcontrols = null;
    cameracontrols = null;
    selectedNode: THREE.Object3D;

    init() {
        //initialize components
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.body.appendChild(this.renderer.domElement);

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.cameracontrols = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
        var limbGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
        var footGeo = new THREE.BoxGeometry(0.7, 0.2, 0.5);

        var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

        this.legLeft = new THREE.Mesh(limbGeo, material);
        this.footLeft = new THREE.Mesh(footGeo, material);

        this.legRight = new THREE.Mesh(limbGeo, material);
        this.footRight = new THREE.Mesh(footGeo, material);

        this.legLeft.position.set(-0.5, 0, 0);
        this.legRight.position.set(0.5, 0, 0);

        this.footLeft.position.set(-0.5, 0, 0);
        this.footRight.position.set(0.5, 0, 0);


        this.translateFootLeft.add(this.footLeft);
        this.translateFootRight.add(this.footRight);

        this.translateLegLeft.add(this.legLeft);
        this.translateLegRight.add(this.legRight);

        this.legAndFootLeft.add(this.translateFootLeft);
        this.legAndFootLeft.add(this.translateLegLeft);

        this.legAndFootRight.add(this.translateFootRight);
        this.legAndFootRight.add(this.translateLegRight);

        this.scaleLegsLeft.add(this.legAndFootLeft);
        this.scaleLegsRight.add(this.legAndFootRight);



        this.translateLegAndFootLeft.add(this.scaleLegsLeft);
        this.translateLegAndFootRight.add(this.scaleLegsRight);
        //this.translateLegRight.add(this.legAndFoot);

        this.robot.add(this.translateLegAndFootLeft);
        this.robot.add(this.translateLegAndFootRight);

        this.scene.add(this.robot);


        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 300, 200);
        this.scene.add(pointLight);

        var ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);

        this.gcontrols = new function () {
            this.legsX = 0.01;
            this.feetX = 0.01;
            this.scale = 1;
            this.legLeftX = 0;
            this.legRightX = 0;

        }

        var gui = new dat.GUI();
        gui.add(this.gcontrols, 'legsX', -1.5, 1.5);
        gui.add(this.gcontrols, 'feetX', -1.5, 1.5);
        gui.add(this.gcontrols, 'scale', -1.5, 1.5);
        gui.add(this.gcontrols, 'legLeftX', -1.5, 1.5);
        gui.add(this.gcontrols, 'legRightX', -1.5, 1.5);

        this.sceneGraph = new Scenegraph2D(this.robot);
        this.sceneGraph.init();
        this.sceneGraph.show();



        //var light = new THREE.PointLight();



        //this.scene.add(light);

        this.camera.position.z = 5;

        this.render(this);

    }

    translate(mesh: THREE.Mesh, xyz: THREE.Vector3) {
        mesh.position = new THREE.Vector3(0, 0, 0);
        mesh.translateX(xyz.x);
        mesh.translateY(xyz.y);
        mesh.translateZ(xyz.z);

        mesh.updateMatrix();

    }

    render(self: Robot) {

        self.renderer.render(self.scene, self.camera);
        self.update();

        requestAnimationFrame(() => self.render(self));

    }

    update() {
        this.cameracontrols.update();

        // have not yet found a way to back-control the sliders ...
        // display style (floating poitn)... solved
        //if (this.selectedNode)
        //   this.selectedNode.setRotationFromEuler(new THREE.Euler(this.gcontrols.theta1, this.gcontrols.theta2, 0));
        //theta2 = gcontrols.theta2;


        if (this.sceneGraph.selectedNode != null) {
            this.sceneGraph.selectedNode.threeObject.position.set(this.gcontrols.feetX, 0, 0);


        }
        /*
         this.translateFootLeft.position.set(this.gcontrols.feetX, 0, 0);
        this.translateFootRight.position.set(this.gcontrols.feetX, 0, 0);
        this.translateLegLeft.position.set(this.gcontrols.legsX, 0, 0);
        this.translateLegRight.position.set(this.gcontrols.legsX, 0, 0);
        this.scaleLegsLeft.scale.set(this.gcontrols.scale, this.gcontrols.scale, this.gcontrols.scale);
        this.scaleLegsRight.scale.set(this.gcontrols.scale, this.gcontrols.scale, this.gcontrols.scale);
        this.translateLegAndFootLeft.position.set(this.gcontrols.legLeftX, 0, 0);
        this.translateLegAndFootRight.position.set(this.gcontrols.legRightX, 0, 0);
        */
    }

}







