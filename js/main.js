define(["require", "exports", "robot"], function (require, exports, robot) {
    "use strict";
    var Main = (function () {
        function Main() {
        }
        Main.prototype.run = function () {
            console.log("starting");
            var rob = new robot.Robot();
            rob.init();
            /*
            this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
            this.gl = this.canvas.getContext("webgl");
    
            if (!this.gl) {
                return;
            }
    
            // setup GLSL program
            this.program = webglUtils.createProgramFromScripts(this.gl, ["2d-vertex-shader", "2d-fragment-shader"]);
            // look up where the vertex data needs to go.
            this.positionLocation = this.gl.getAttribLocation(this.program, "a_position");
    
            // lookup uniforms
            this.resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
            this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");
            this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    
            // Create a buffer to put positions in
            this.positionBuffer = this.gl.createBuffer();
            // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            // Put geometry data into buffer
            setGeometry(this.gl);
    
            this.translation = [1, 1];
            this.angleInRadians = 0;
            this.scale = [0.85, 0.85];
            this.color = [Math.random(), Math.random(), Math.random(), 1];
    
            this.drawScene();
            let self = this;
    
            // Setup a ui.
            webglLessonsUI.setupSlider("#x", { value: this.translation[0], slide: this.updatePosition(0), max: this.gl.canvas.width });
            webglLessonsUI.setupSlider("#y", { value: this.translation[1], slide: this.updatePosition(1), max: this.gl.canvas.height });
            webglLessonsUI.setupSlider("#angle", { slide: (ev: Event, ui) => { this.updateAngle(ev, ui); }, max: 360 });
            webglLessonsUI.setupSlider("#scaleX", { value: this.scale[0], slide: (ev: Event, ui) => { return this.updateScale(0, ev, ui); }, min: -5, max: 5, step: 0.01, precision: 2 });
            webglLessonsUI.setupSlider("#scaleY", { value: this.scale[1], slide: (ev: Event, ui) => { return this.updateScale(1, ev, ui); }, min: -5, max: 5, step: 0.01, precision: 2 });
    
            console.log(this);
            */
        };
        Main.prototype.updatePosition = function (index) {
            return function (event, ui) {
                this.translation[index] = ui.value;
                this.drawScene();
            };
        };
        Main.prototype.updateAngle = function (event, ui) {
            var angleInDegrees = 360 - ui.value;
            this.angleInRadians = angleInDegrees * Math.PI / 180;
            this.drawScene();
        };
        Main.prototype.updateScale = function (index, event, ui) {
            this.scale[index] = ui.value;
            this.drawScene();
        };
        // Draw the scene.
        Main.prototype.drawScene = function () {
            console.log("scene being drawn");
            webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
            // Tell WebGL how to convert from clip space to pixels
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            // Clear the canvas.
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            // Tell it to use our program (pair of shaders)
            this.gl.useProgram(this.program);
            // Turn on the attribute
            this.gl.enableVertexAttribArray(this.positionLocation);
            // Bind the position buffer.
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            var size = 2; // 2 components per iteration
            var type = this.gl.FLOAT; // the data is 32bit floats
            var normalize = false; // don't normalize the data
            var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
            var offset = 0; // start at the beginning of the buffer
            this.gl.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);
            // set the resolution
            this.gl.uniform2f(this.resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);
            // set the color
            this.gl.uniform4fv(this.colorLocation, this.color);
            // Compute the matrices
            var translationMatrix = exports.m3.translation(this.translation[0], this.translation[1]);
            var rotationMatrix = exports.m3.rotation(this.angleInRadians);
            var scaleMatrix = exports.m3.scaling(this.scale[0], this.scale[1]);
            // Starting Matrix.
            var matrix = exports.m3.identity();
            for (var i = 0; i < 5; ++i) {
                // Multiply the matrices.
                matrix = exports.m3.multiply(matrix, translationMatrix);
                matrix = exports.m3.multiply(matrix, rotationMatrix);
                matrix = exports.m3.multiply(matrix, scaleMatrix);
                // Set the matrix.
                this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);
                // Draw the geometry.
                var primitiveType = this.gl.TRIANGLES;
                var offset = 0;
                var count = 6; // 6 triangles in the 'F', 3 points per triangle
                this.gl.drawArrays(primitiveType, offset, count);
            }
        };
        return Main;
    }());
    exports.Main = Main;
    exports.m3 = {
        identity: function () {
            return [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1,
            ];
        },
        translation: function (tx, ty) {
            return [
                1, 0, 0,
                0, 1, 0,
                tx, ty, 1,
            ];
        },
        rotation: function (angleInRadians) {
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            return [
                c, -s, 0,
                s, c, 0,
                0, 0, 1,
            ];
        },
        scaling: function (sx, sy) {
            return [
                sx, 0, 0,
                0, sy, 0,
                0, 0, 1,
            ];
        },
        multiply: function (a, b) {
            var a00 = a[0 * 3 + 0];
            var a01 = a[0 * 3 + 1];
            var a02 = a[0 * 3 + 2];
            var a10 = a[1 * 3 + 0];
            var a11 = a[1 * 3 + 1];
            var a12 = a[1 * 3 + 2];
            var a20 = a[2 * 3 + 0];
            var a21 = a[2 * 3 + 1];
            var a22 = a[2 * 3 + 2];
            var b00 = b[0 * 3 + 0];
            var b01 = b[0 * 3 + 1];
            var b02 = b[0 * 3 + 2];
            var b10 = b[1 * 3 + 0];
            var b11 = b[1 * 3 + 1];
            var b12 = b[1 * 3 + 2];
            var b20 = b[2 * 3 + 0];
            var b21 = b[2 * 3 + 1];
            var b22 = b[2 * 3 + 2];
            return [
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,
                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,
                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ];
        },
    };
    // Fill the buffer with the values that define a rectangle
    function setGeometry(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            10, 20,
            80, 20,
            10, 30,
            10, 30,
            80, 20,
            80, 30
        ]), gl.STATIC_DRAW);
    }
    exports.setGeometry = setGeometry;
});
//# sourceMappingURL=main.js.map