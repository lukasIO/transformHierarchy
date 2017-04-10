define(["require", "exports"], function (require, exports) {
    "use strict";
    var Robot = (function () {
        function Robot() {
        }
        Robot.prototype.init = function () {
            console.log("robot init");
        };
        return Robot;
    }());
    exports.Robot = Robot;
});
//# sourceMappingURL=robot.js.map