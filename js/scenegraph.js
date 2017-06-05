define(["require", "exports", "scenenode"], function (require, exports, scenenode_1) {
    "use strict";
    var Scenegraph2D = (function () {
        function Scenegraph2D(root) {
            this.graph = [];
            this.container = document.createElement("div");
            this.unselectedMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
            this.selectedMat = new THREE.MeshLambertMaterial({ color: 0xff00ff });
            this._root = root;
        }
        Scenegraph2D.prototype.init = function () {
            this.graph = this.traverseGraph(this._root, 0);
            this.container.classList.add("graphContainer");
            this.container.id = "graph";
            document.body.appendChild(this.container);
        };
        Scenegraph2D.prototype.traverseGraph = function (obj, depth) {
            var _this = this;
            depth += 1;
            obj.matrixAutoUpdate = true;
            var children = [];
            obj.children.forEach(function (child) {
                var node = new scenenode_1.SceneNode(depth);
                node.threeObject = child;
                node.children = _this.traverseGraph(child, depth);
                console.log(child.type);
                switch (child.type) {
                    case "Mesh":
                        node.transformType = 0;
                        break;
                    case "Object3D":
                        node.transformType = 1;
                        break;
                    case "Group":
                        node.transformType = 2;
                        break;
                    default:
                        node.transformType = -1;
                        break;
                }
                children.push(node);
            });
            return children;
        };
        Scenegraph2D.prototype.show = function () {
            //this.printGraphRecursive(this.graph);
            this.createGraphRecursive(this.graph, this.container);
            $('.child').connections('update');
        };
        Scenegraph2D.prototype.printGraphRecursive = function (_nodes) {
            var _this = this;
            _nodes.forEach(function (node) {
                console.log(node.depth);
                console.log(node);
                _this.printGraphRecursive(node.children);
            });
        };
        Scenegraph2D.prototype.createGraphRecursive = function (_nodes, _parent) {
            var _this = this;
            var first = true;
            _nodes.forEach(function (node) {
                console.log(node.depth);
                console.log(node);
                var el = document.createElement('button');
                el.innerHTML = String(node.transformType);
                if (node.transformType == 2) {
                    el.classList.add("circle");
                }
                el.classList.add("child");
                el.classList.add("depth_" + node.depth);
                el.addEventListener('click', function (event) {
                    _this.selectedNode = node;
                    _this.selectedNode.updateControls = true;
                    console.log(_this.selectedNode);
                    //prevent parent divs from firing click events
                    event.stopPropagation();
                    //change material/color in order to view the affected nodes in canvas
                    _this.setMaterial(_this._root, _this.unselectedMat);
                    _this.setMaterial(_this.selectedNode.threeObject, _this.selectedMat);
                });
                first = false;
                _parent.appendChild(el);
                $(_parent).connections({ to: $(el) });
                _this.createGraphRecursive(node.children, el);
            });
        };
        Scenegraph2D.prototype.setMaterial = function (obj, material) {
            var _this = this;
            if (obj.type == "Mesh") {
                var mesh = obj;
                mesh.material = material;
            }
            obj.children.forEach(function (child) {
                if (child.type == "Mesh") {
                    var mesh = child;
                    mesh.material = material;
                }
                _this.setMaterial(child, material);
            });
        };
        Scenegraph2D.prototype.lineToChild = function () {
        };
        return Scenegraph2D;
    }());
    exports.Scenegraph2D = Scenegraph2D;
});
//# sourceMappingURL=scenegraph.js.map