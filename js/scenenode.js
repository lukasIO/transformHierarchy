define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SceneNode = /** @class */ (function () {
        function SceneNode(hierarchydepth) {
            this.isActive = false;
            this.hasTransform = false;
            this.children = [];
            this.depth = 0;
            this.transformType = 0;
            this.updateControls = false;
            this.depth = hierarchydepth;
        }
        return SceneNode;
    }());
    exports.SceneNode = SceneNode;
});
//# sourceMappingURL=scenenode.js.map