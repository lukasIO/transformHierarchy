import "lib/three";
import "lib/OrbitControls";
import * as dat from "lib/dat.gui.min";

export class Robot {

    constructor() {

    }

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cube: THREE.Mesh;
    legLeft: THREE.Mesh;

    init() {
        //initialize components
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(bodyGeo, material);
        this.cube.matrixAutoUpdate = false;

        var legGeo = new THREE.BoxGeometry(0.5, 1, 0.5);

        this.legLeft = new THREE.Mesh(legGeo, material);
        this.legLeft.position.y = -1;
        this.legLeft.position.x = -0.5;

        this.cube.add(this.legLeft);

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 300, 200);
        this.scene.add(pointLight);

        var ambientLight = new THREE.AmbientLight(0x111111);
        this.scene.add(ambientLight);

        var gcontrols = new function () {
            this.theta1 = 0.01;
            this.theta2 = 0.01;
            this.wireshow = false;
        }

        var gui = new dat.GUI();
        gui.add(gcontrols, 'theta1', -1.5, 1.5);
        gui.add(gcontrols, 'theta2', -1.5, 1.5);
        gui.add(gcontrols, 'wireshow');





        //var light = new THREE.PointLight();

        this.scene.add(this.cube);

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
        requestAnimationFrame(() => self.render(self));

        this.renderer.render(self.scene, self.camera);
    }
}







