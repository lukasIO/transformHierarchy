var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ttype;
    (function (ttype) {
        ttype[ttype["translate"] = 0] = "translate";
        ttype[ttype["rotate"] = 1] = "rotate";
        ttype[ttype["scale"] = 2] = "scale";
    })(ttype = exports.ttype || (exports.ttype = {}));
    ;
    var Transform = /** @class */ (function (_super) {
        __extends(Transform, _super);
        function Transform(_transformType) {
            var _this = _super.call(this) || this;
            _this.type = "Transform";
            _this.transformType = _transformType;
            return _this;
        }
        return Transform;
    }(THREE.Object3D));
    exports.Transform = Transform;
});
//# sourceMappingURL=transformnode.js.map