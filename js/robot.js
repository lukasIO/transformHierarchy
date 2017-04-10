define(["require", "exports", "lib/dat.gui.min", "scenegraph", "lib/three", "lib/OrbitControls"], function (require, exports, dat, scenegraph_1) {
    "use strict";
    var Robot = (function () {
        function Robot() {
            this.gcontrols = null;
            this.cameracontrols = null;
        }
        Robot.prototype.init = function () {
            //initialize components
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.cameracontrols = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
            this.cube = new THREE.Mesh(bodyGeo, material);
            this.cube.matrixAutoUpdate = false;
            var limbGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
            this.legLeft = new THREE.Mesh(limbGeo, material);
            this.footLeft = new THREE.Mesh(limbGeo, material);
            this.legRight = new THREE.Mesh(limbGeo, material);
            this.footRight = new THREE.Mesh(limbGeo, material);
            this.legLeft.position.set(-0.5, 0, 0);
            this.legRight.position.set(0.5, 0, 0);
            this.footLeft.position.set(-0.5, 0, 0);
            this.footRight.position.set(0.5, 0, 0);
            this.legs = new THREE.Object3D();
            this.feet = new THREE.Object3D();
            this.legsAndFeet = new THREE.Group();
            this.legs.add(this.legLeft);
            this.legs.add(this.legRight);
            this.feet.add(this.footLeft);
            this.feet.add(this.footRight);
            this.legs.position.set(0, -1, 0);
            this.feet.position.set(0, -1.5, 0);
            this.feet.children.forEach(function (child) { return child.rotateZ(0.9); });
            this.legsAndFeet.add(this.legs);
            this.legsAndFeet.add(this.feet);
            this.cube.add(this.legsAndFeet);
            var pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(0, 300, 200);
            this.scene.add(pointLight);
            var ambientLight = new THREE.AmbientLight(0x111111);
            this.scene.add(ambientLight);
            this.gcontrols = new function () {
                this.theta1 = 0.01;
                this.theta2 = 0.01;
            };
            var gui = new dat.GUI();
            gui.add(this.gcontrols, 'theta1', -1.5, 1.5);
            gui.add(this.gcontrols, 'theta2', -1.5, 1.5);
            var test = new scenegraph_1.Scenegraph2D(this.cube);
            test.init();
            test.show();
            //var light = new THREE.PointLight();
            this.scene.add(this.cube);
            //this.scene.add(light);
            this.camera.position.z = 5;
            this.render(this);
        };
        Robot.prototype.translate = function (mesh, xyz) {
            mesh.position = new THREE.Vector3(0, 0, 0);
            mesh.translateX(xyz.x);
            mesh.translateY(xyz.y);
            mesh.translateZ(xyz.z);
            mesh.updateMatrix();
        };
        Robot.prototype.render = function (self) {
            self.renderer.render(self.scene, self.camera);
            self.update();
            requestAnimationFrame(function () { return self.render(self); });
        };
        Robot.prototype.update = function () {
            this.cameracontrols.update();
            // have not yet found a way to back-control the sliders ...
            // display style (floating poitn)... solved
            if (this.selectedNode)
                this.selectedNode.setRotationFromEuler(new THREE.Euler(this.gcontrols.theta1, this.gcontrols.theta2, 0));
            //theta2 = gcontrols.theta2;
        };
        return Robot;
    }());
    exports.Robot = Robot;
});
//# sourceMappingURL=robot.js.map