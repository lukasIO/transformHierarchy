define(["require", "exports"], function (require, exports) {
    "use strict";
    var SceneNode = (function () {
        function SceneNode(hierarchydepth) {
            this.isActive = false;
            this.hasTransform = false;
            this.children = [];
            this.depth = 0;
            this.transformType = 0;
            this.depth = hierarchydepth;
        }
        return SceneNode;
    }());
    exports.SceneNode = SceneNode;
});
//# sourceMappingURL=scenenode.js.map