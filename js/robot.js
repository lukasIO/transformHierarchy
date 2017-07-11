define(["require", "exports", "lib/three"], function (require, exports) {
    "use strict";
    var Robot = (function () {
        function Robot() {
            //robot parts 
            this.root = new THREE.Group();
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
            this.neck = new THREE.Mesh();
            this.head = new THREE.Mesh();
            this.body = new THREE.Object3D();
            this.init();
        }
        Robot.prototype.init = function () {
            var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
            var limbGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
            var footGeo = new THREE.BoxGeometry(0.9, 0.2, 0.5);
            var neckGeo = new THREE.BoxGeometry(0.2, 0.4, 0.2);
            var headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
            this.legLeft = new THREE.Mesh(limbGeo, material);
            this.footLeft = new THREE.Mesh(footGeo, material);
            this.legRight = new THREE.Mesh(limbGeo, material);
            this.footRight = new THREE.Mesh(footGeo, material);
            this.armsLeft = new THREE.Mesh(limbGeo, material);
            this.armsRight = new THREE.Mesh(limbGeo, material);
            this.neck = new THREE.Mesh(neckGeo, material);
            this.head = new THREE.Mesh(headGeo, material);
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
            this.neck.add(this.head);
            this.head.position.set(0, 0.6, 0);
            this.body.add(this.neck);
            this.neck.position.set(0, 1.2, 0);
            this.body.add(this.legs);
            this.body.add(this.arms);
            this.root.add(this.body);
        };
        return Robot;
    }());
    exports.Robot = Robot;
});
//# sourceMappingURL=robot.js.map