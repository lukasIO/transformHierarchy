import "lib/three";
import "lib/ColladaLoader";
import "lib/jsplumb";
import { Robot } from "robot";
import { TransformHierarchy } from "transformHierarchy";

export class Main {

    fromFile: boolean = true;

    run() {
        console.log("starting");

        if (this.fromFile) {
            this.loadModelFromFile('./js/robot.dae');
        }
        else {
            var botModel = new Robot();
            var hierarchy = new TransformHierarchy(botModel.root);
        }

    }

    loadModelFromFile(path: String) {
        let loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load(path, function (collada) {
            let dae = collada.scene;
            dae.scale.x = dae.scale.y = dae.scale.z = 1;
            dae.updateMatrix();
            var rootObj = new THREE.Group();
            rootObj.scale.x = rootObj.scale.y = rootObj.scale.z = 0.01;
            rootObj.updateMatrix();
            rootObj.add(dae);

            var hierarchy = new TransformHierarchy(rootObj);

        });
    }

    updatePosition(index) {
        return function (event, ui) {
            this.translation[index] = ui.value;
            this.drawScene();
        }
    }

}






