import { SceneNode } from "scenenode";

export class Scenegraph2D {

    constructor(root: THREE.Object3D) {
        this._root = root;
    }

    _root: THREE.Object3D;
    graph: SceneNode[] = [];

    init() {
        this.graph = this.traverseGraph(this._root, 0);

    }

    traverseGraph(obj: THREE.Object3D, depth: number) {

        obj.matrixAutoUpdate = true;
        let children: SceneNode[] = [];
        obj.children.forEach((child: THREE.Object3D) => {

            let node = new SceneNode(depth);
            node.children = this.traverseGraph(child, depth);
            children.push(node);

        }
        );

        depth += 1;
        return children;




    }


    show() {


        this.printGraphRecursive(this.graph);

    }

    printGraphRecursive(_nodes: SceneNode[]) {
        _nodes.forEach((node) => {
            console.log(node.depth);
            console.log(node);
            this.printGraphRecursive(node.children);
        });
    }

    lineToChild() {



    }

}