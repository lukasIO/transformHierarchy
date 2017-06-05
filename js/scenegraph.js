define(["require", "exports", "scenenode"], function (require, exports, scenenode_1) {
    "use strict";
    var Scenegraph2D = (function () {
        function Scenegraph2D(root) {
            this.graph = [];
            this.container = document.createElement("div");
            this._root = root;
        }
        Scenegraph2D.prototype.init = function () {
            this.graph = this.traverseGraph(this._root, 0);
            this.container.classList.add("graphContainer");
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
                el.classList.add("child");
                el.classList.add("depth_" + node.depth);
                el.addEventListener('click', function (event) {
                    _this.selectedNode = node;
                });
                first = false;
                _parent.appendChild(el);
                _this.createGraphRecursive(node.children, el);
            });
        };
        Scenegraph2D.prototype.lineToChild = function () {
        };
        return Scenegraph2D;
    }());
    exports.Scenegraph2D = Scenegraph2D;
});
//# sourceMappingURL=scenegraph.js.map