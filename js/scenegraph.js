define(["require", "exports", "scenenode"], function (require, exports, scenenode_1) {
    "use strict";
    var Scenegraph2D = (function () {
        function Scenegraph2D(root) {
            this.graph = [];
            this._root = root;
        }
        Scenegraph2D.prototype.init = function () {
            this.graph = this.traverseGraph(this._root, 0);
        };
        Scenegraph2D.prototype.traverseGraph = function (obj, depth) {
            var _this = this;
            obj.matrixAutoUpdate = true;
            var children = [];
            obj.children.forEach(function (child) {
                var node = new scenenode_1.SceneNode(depth);
                node.children = _this.traverseGraph(child, depth);
                children.push(node);
            });
            depth += 1;
            return children;
        };
        Scenegraph2D.prototype.show = function () {
            this.printGraphRecursive(this.graph);
        };
        Scenegraph2D.prototype.printGraphRecursive = function (_nodes) {
            var _this = this;
            _nodes.forEach(function (node) {
                console.log(node.depth);
                console.log(node);
                _this.printGraphRecursive(node.children);
            });
        };
        Scenegraph2D.prototype.lineToChild = function () {
        };
        return Scenegraph2D;
    }());
    exports.Scenegraph2D = Scenegraph2D;
});
//# sourceMappingURL=scenegraph.js.map