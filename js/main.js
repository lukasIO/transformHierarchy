define(["require", "exports", "robot", "transformHierarchy", "lib/three", "lib/ColladaLoader"], function (require, exports, robot_1, transformHierarchy_1) {
    "use strict";
    var Main = (function () {
        function Main() {
            this.fromFile = true;
        }
        Main.prototype.run = function () {
            console.log("starting");
            if (this.fromFile) {
                this.loadModelFromFile('./geo/robot.dae');
            }
            else {
                var botModel = new robot_1.Robot();
                var hierarchy = new transformHierarchy_1.TransformHierarchy(botModel.root);
            }
        };
        Main.prototype.loadModelFromFile = function (path) {
            var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;
            loader.load(path, function (collada) {
                var dae = collada.scene;
                dae.scale.x = dae.scale.y = dae.scale.z = 0.01;
                dae.updateMatrix();
                var rootObj = new THREE.Group();
                rootObj.add(dae);
                var hierarchy = new transformHierarchy_1.TransformHierarchy(dae);
            });
        };
        Main.prototype.updatePosition = function (index) {
            return function (event, ui) {
                this.translation[index] = ui.value;
                this.drawScene();
            };
        };
        return Main;
    }());
    exports.Main = Main;
});
//# sourceMappingURL=main.js.map