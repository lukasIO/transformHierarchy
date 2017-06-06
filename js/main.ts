import "lib/three";
import "lib/ColladaLoader";
import { Robot } from "robot";
import { TransformHierarchy } from "transformHierarchy";

export class Main {

    fromFile: boolean = false;

    run() {
        console.log("starting");

        if (this.fromFile) {
            this.loadModelFromFile('./js/monster.dae');
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
            dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
            dae.updateMatrix();
            var rootObj = new THREE.Group();
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






