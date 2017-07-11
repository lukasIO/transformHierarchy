/*
creates a HTML scenegraph from a THREEjs node hierarchy
with click callbacks to select affected 3d tree
*/
define(["require", "exports", "scenenode"], function (require, exports, scenenode_1) {
    "use strict";
    var Scenegraph2D = (function () {
        function Scenegraph2D(root) {
            this.graph = [];
            this.container = document.createElement("div");
            this.unselectedMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
            this.selectedMat = new THREE.MeshLambertMaterial({ color: 0xff00ff });
            this.lines = jsPlumb; //reference to line library, globally added in html
            this._root = root;
        }
        Scenegraph2D.prototype.init = function () {
            this.graph = this.traverseGraph(this._root, 0);
            this.container.classList.add("graphContainer");
            this.container.id = "graph";
            //this.container.style.width = "50%";
            //this.container.style.height = "100%";
            var contentWrapper = document.getElementById("contentwrapper");
            contentWrapper.appendChild(this.container);
            this.lines.importDefaults({
                ConnectionsDetachable: false
            });
            this.commonLine = {
                anchors: ["BottomCenter", "TopCenter"],
                endpoint: "Blank",
                connector: ["StateMachine", { curviness: 5 }]
            };
            var self = this;
            window.onresize = function () { return function () {
                self.lines.repaintEverything();
            }; };
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
            this.createGraphRecursive(this.graph, this.container, true);
            //$('.child').connections('update');
            jsPlumb.repaintEverything();
        };
        Scenegraph2D.prototype.printGraphRecursive = function (_nodes) {
            var _this = this;
            _nodes.forEach(function (node) {
                console.log(node.depth);
                console.log(node);
                _this.printGraphRecursive(node.children);
            });
        };
        Scenegraph2D.prototype.createGraphRecursive = function (_nodes, _parent, isRoot) {
            var _this = this;
            if (isRoot === void 0) { isRoot = false; }
            _nodes.forEach(function (node) {
                var el = document.createElement('div');
                el.innerHTML = String(node.threeObject.name);
                if (node.transformType == 2) {
                    el.classList.add("graphButtonGroup");
                }
                else {
                    el.classList.add("graphButton");
                }
                el.classList.add("child");
                //el.style.paddingRight = ((node.children.length - 1) * 55) + "px";
                var childrenContainer = document.createElement("div");
                //childrenContainer.style.width = (node.children.length * 55) + "px";
                childrenContainer.classList.add("childrenContainer");
                //el.classList.add("depth_" + node.depth);
                //el.style.width = (100 / node.children.length) + "%";
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
                childrenContainer.appendChild(el);
                _parent.appendChild(childrenContainer);
                //$(_parent).connections({ to: $(el) });
                if (!isRoot) {
                    _this.lines.connect({
                        source: _parent.firstChild,
                        target: el
                    }, _this.commonLine);
                }
                _this.createGraphRecursive(node.children, childrenContainer);
            });
        };
        Scenegraph2D.prototype.setMaterial = function (obj, material) {
            var _this = this;
            if (obj.type == "Mesh") {
                var mesh = obj;
                mesh.material = material;
            }
            ;
            obj.children.forEach(function (child) {
                if (child.type == "Mesh") {
                    var mesh = child;
                    mesh.material = material;
                }
                _this.setMaterial(child, material);
            });
        };
        return Scenegraph2D;
    }());
    exports.Scenegraph2D = Scenegraph2D;
});
//# sourceMappingURL=scenegraph.js.map