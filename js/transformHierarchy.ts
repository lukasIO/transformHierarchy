import "lib/three";
import "lib/OrbitControls";
import * as dat from "lib/dat.gui.min";
import { Scenegraph2D } from "scenegraph";


export class TransformHierarchy {

    constructor(model: THREE.Object3D) {
        this.create(model);
    }

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;

    sceneGraph: Scenegraph2D;

    gui = null;
    gcontrols = null;
    cameracontrols = null;
    selectedNode: THREE.Object3D;

    create(model: THREE.Object3D) {
        //initialize components
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / (2 * window.innerHeight), 0.1, 1000);


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
        var contentWrapper = document.getElementById("contentwrapper");
        this.renderer.domElement.id = "canvas";
        contentWrapper.appendChild(this.renderer.domElement);




        //this.cameracontrols = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.scene.add(model);

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 300, 200);
        this.scene.add(pointLight);

        var ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);

        this.camera.position.z = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.initGUI();

        this.sceneGraph = new Scenegraph2D(model);
        this.sceneGraph.init();
        this.sceneGraph.show();

        this.render(this);


    }

    initGUI() {


        this.gcontrols = new function () {

            this.translateX = 0.1;
            this.translateY = 0.1;
            this.translateZ = 0.1;
            this.rotateX = 0.1;
            this.rotateY = 0.1;
            this.rotateZ = 0.1;
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            this.scaleZ = 0.9;


        }

        this.gui = new dat.GUI();
        this.gui.add(this.gcontrols, 'translateX', -1.5, 1.5);
        this.gui.add(this.gcontrols, 'translateY', -1.5, 1.5);
        this.gui.add(this.gcontrols, 'translateZ', -1.5, 1.5);
        this.gui.add(this.gcontrols, 'rotateX', -3.14, 3.14);
        this.gui.add(this.gcontrols, 'rotateY', -3.14, 3.14);
        this.gui.add(this.gcontrols, 'rotateZ', -3.14, 3.14);
        this.gui.add(this.gcontrols, 'scaleX', 0.1, 2);
        this.gui.add(this.gcontrols, 'scaleY', 0.1, 2);
        this.gui.add(this.gcontrols, 'scaleZ', 0.1, 2);

    }

    render(self: TransformHierarchy) {

        self.renderer.render(self.scene, self.camera);
        self.update();

        requestAnimationFrame(() => self.render(self));

    }

    update() {

        if (this.sceneGraph.selectedNode != null) {
            if (this.sceneGraph.selectedNode.updateControls) {
                this.gcontrols.translateX = this.sceneGraph.selectedNode.threeObject.position.x;
                this.gcontrols.translateY = this.sceneGraph.selectedNode.threeObject.position.y;
                this.gcontrols.translateZ = this.sceneGraph.selectedNode.threeObject.position.z;
                this.gcontrols.rotateX = this.sceneGraph.selectedNode.threeObject.rotation.x;
                this.gcontrols.rotateY = this.sceneGraph.selectedNode.threeObject.rotation.y;
                this.gcontrols.rotateZ = this.sceneGraph.selectedNode.threeObject.rotation.z;
                this.gcontrols.scaleX = this.sceneGraph.selectedNode.threeObject.scale.x;
                this.gcontrols.scaleY = this.sceneGraph.selectedNode.threeObject.scale.y;
                this.gcontrols.scaleZ = this.sceneGraph.selectedNode.threeObject.scale.z;
                for (var i in this.gui.__controllers) {
                    this.gui.__controllers[i].updateDisplay();
                }

                this.sceneGraph.selectedNode.updateControls = false;
            }
            this.sceneGraph.selectedNode.threeObject.position.set(this.gcontrols.translateX, this.gcontrols.translateY, this.gcontrols.translateZ);
            this.sceneGraph.selectedNode.threeObject.rotation.set(this.gcontrols.rotateX, this.gcontrols.rotateY, this.gcontrols.rotateZ);
            this.sceneGraph.selectedNode.threeObject.scale.set(this.gcontrols.scaleX, this.gcontrols.scaleY, this.gcontrols.scaleZ);

        }

    }


}