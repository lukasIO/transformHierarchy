/*
creates a HTML scenegraph from a THREEjs node hierarchy
with click callbacks to select affected 3d tree
*/


import { SceneNode } from "scenenode";

export class Scenegraph2D {

    constructor(root: THREE.Object3D) {
        this._root = root;
    }

    _root: THREE.Object3D;
    graph: SceneNode[] = [];
    container: HTMLDivElement = document.createElement("div");
    selectedNode: SceneNode;

    unselectedMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    selectedMat = new THREE.MeshLambertMaterial({ color: 0xff00ff });


    init() {
        this.graph = this.traverseGraph(this._root, 0);

        this.container.classList.add("graphContainer");
        this.container.id = "graph";
        document.body.appendChild(this.container);

    }

    traverseGraph(obj: THREE.Object3D, depth: number) {

        depth += 1;

        obj.matrixAutoUpdate = true;
        let children: SceneNode[] = [];
        obj.children.forEach((child: THREE.Object3D) => {

            let node = new SceneNode(depth);
            node.threeObject = child;
            node.children = this.traverseGraph(child, depth);


            switch (child.type) {
                case "Mesh": //mesh node
                    node.transformType = 0;
                    break;
                case "Object3D": //used as a transform node
                    node.transformType = 1;
                    break;
                case "Group": //group node
                    node.transformType = 2;
                    break;

                default:
                    node.transformType = -1;
                    break;
            }

            children.push(node);

        }
        );

        return children;

    }


    show() {


        //this.printGraphRecursive(this.graph);
        this.createGraphRecursive(this.graph, this.container);

        $('.child').connections('update');

    }

    printGraphRecursive(_nodes: SceneNode[]) {
        _nodes.forEach((node) => {
            console.log(node.depth);
            console.log(node);
            this.printGraphRecursive(node.children);
        });
    }

    createGraphRecursive(_nodes: SceneNode[], _parent: HTMLElement) {

        _nodes.forEach((node) => {


            let el: HTMLButtonElement = document.createElement('button');
            el.innerHTML = String(node.transformType);
            if (node.transformType == 2) {
                el.classList.add("circle")
            }
            el.classList.add("child");
            el.classList.add("depth_" + node.depth);

            el.addEventListener('click', (event) => {

                this.selectedNode = node;
                this.selectedNode.updateControls = true;
                console.log(this.selectedNode);

                //prevent parent divs from firing click events
                event.stopPropagation();

                //change material/color in order to view the affected nodes in canvas
                this.setMaterial(this._root, this.unselectedMat);
                this.setMaterial(this.selectedNode.threeObject, this.selectedMat);

            });


            _parent.appendChild(el);
            $(_parent).connections({ to: $(el) });

            this.createGraphRecursive(node.children, el);

        });
    }

    setMaterial(obj: THREE.Object3D, material: THREE.Material) {
        if (obj.type == "Mesh") {
            let mesh = obj as THREE.Mesh;
            mesh.material = material;
        };
        obj.children.forEach((child) => {
            if (child.type == "Mesh") {
                let mesh = child as THREE.Mesh;
                mesh.material = material;
            }
            this.setMaterial(child, material);

        });

    }

}