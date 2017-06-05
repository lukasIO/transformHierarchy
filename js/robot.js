define(["require", "exports", "lib/dat.gui.min", "scenegraph", "lib/three", "lib/OrbitControls"], function (require, exports, dat, scenegraph_1) {
    "use strict";
    var Robot = (function () {
        function Robot() {
            //robot parts - Object3D used as transform nodes
            this.robot = new THREE.Group();
            this.translateLegLeft = new THREE.Object3D();
            this.translateLegRight = new THREE.Object3D();
            this.scaleLegsLeft = new THREE.Object3D();
            this.scaleLegsRight = new THREE.Object3D();
            this.legAndFootLeft = new THREE.Object3D();
            this.legAndFootRight = new THREE.Object3D();
            this.translateLegAndFootLeft = new THREE.Object3D();
            this.translateLegAndFootRight = new THREE.Object3D();
            this.translateFootLeft = new THREE.Object3D();
            this.translateFootRight = new THREE.Object3D();
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
            };
            var gui = new dat.GUI();
            gui.add(this.gcontrols, 'legsX', -1.5, 1.5);
            gui.add(this.gcontrols, 'feetX', -1.5, 1.5);
            gui.add(this.gcontrols, 'scale', -1.5, 1.5);
            gui.add(this.gcontrols, 'legLeftX', -1.5, 1.5);
            gui.add(this.gcontrols, 'legRightX', -1.5, 1.5);
            this.sceneGraph = new scenegraph_1.Scenegraph2D(this.robot);
            this.sceneGraph.init();
            this.sceneGraph.show();
            //var light = new THREE.PointLight();
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
        };
        return Robot;
    }());
    exports.Robot = Robot;
});
//# sourceMappingURL=robot.js.map