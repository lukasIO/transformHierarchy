define(["require", "exports", "lib/dat.gui.min", "scenegraph", "lib/three", "lib/OrbitControls"], function (require, exports, dat, scenegraph_1) {
    "use strict";
    var Robot = (function () {
        function Robot() {
            //robot parts 
            this.robot = new THREE.Group();
            this.footLeft = new THREE.Mesh();
            this.footRight = new THREE.Mesh();
            this.legLeft = new THREE.Mesh();
            this.legRight = new THREE.Object3D();
            this.legAndFootLeft = new THREE.Group();
            this.legAndFootRight = new THREE.Group();
            this.legs = new THREE.Group();
            this.armsLeft = new THREE.Mesh();
            this.armsRight = new THREE.Mesh();
            this.arms = new THREE.Group();
            this.body = new THREE.Object3D();
            this.gui = null;
            this.gcontrols = null;
            this.cameracontrols = null;
        }
        Robot.prototype.init = function () {
            //initialize components
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            document.body.appendChild(this.renderer.domElement);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            //this.cameracontrols = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
            var limbGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
            var footGeo = new THREE.BoxGeometry(0.9, 0.2, 0.5);
            var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
            this.legLeft = new THREE.Mesh(limbGeo, material);
            this.footLeft = new THREE.Mesh(footGeo, material);
            this.legRight = new THREE.Mesh(limbGeo, material);
            this.footRight = new THREE.Mesh(footGeo, material);
            this.armsLeft = new THREE.Mesh(limbGeo, material);
            this.armsRight = new THREE.Mesh(limbGeo, material);
            this.body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), material);
            this.body.position.set(0, 0, 0);
            this.legLeft.position.set(-0.5, -1.5, 0);
            this.legRight.position.set(0.5, -1.5, 0);
            this.footLeft.position.set(-0.75, -2, 0);
            this.footRight.position.set(0.75, -2, 0);
            this.armsLeft.position.set(-1, 1, 0);
            this.armsLeft.rotation.set(0, 0, -1);
            this.armsRight.position.set(1, 1, 0);
            this.armsRight.rotation.set(0, 0, 1);
            this.legAndFootLeft.add(this.legLeft);
            this.legAndFootLeft.add(this.footLeft);
            this.legAndFootRight.add(this.legRight);
            this.legAndFootRight.add(this.footRight);
            this.legs.add(this.legAndFootLeft);
            this.legs.add(this.legAndFootRight);
            this.arms.add(this.armsLeft);
            this.arms.add(this.armsRight);
            this.body.add(this.legs);
            this.body.add(this.arms);
            this.robot.add(this.body);
            this.scene.add(this.robot);
            var pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(0, 300, 200);
            this.scene.add(pointLight);
            var ambientLight = new THREE.AmbientLight(0x111111);
            this.scene.add(ambientLight);
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
            };
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
            this.sceneGraph = new scenegraph_1.Scenegraph2D(this.robot);
            this.sceneGraph.init();
            this.sceneGraph.show();
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
        };
        return Robot;
    }());
    exports.Robot = Robot;
});
//# sourceMappingURL=robot.js.map