import { SceneNode } from "scenenode";

export class Scenegraph2D {

    constructor(root: THREE.Object3D) {
        this._root = root;
    }

    _root: THREE.Object3D;
    graph: SceneNode[] = [];
    container: HTMLDivElement = document.createElement("div");
    selectedNode: SceneNode;



    init() {
        this.graph = this.traverseGraph(this._root, 0);

        this.container.classList.add("graphContainer");
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

            console.log(child.type);
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

    }

    printGraphRecursive(_nodes: SceneNode[]) {
        _nodes.forEach((node) => {
            console.log(node.depth);
            console.log(node);
            this.printGraphRecursive(node.children);
        });
    }

    createGraphRecursive(_nodes: SceneNode[], _parent: HTMLElement) {
        let first: boolean = true;
        _nodes.forEach((node) => {
            console.log(node.depth);
            console.log(node);


            let el: HTMLButtonElement = document.createElement('button');
            el.innerHTML = String(node.transformType);
            el.classList.add("child");
            el.classList.add("depth_" + node.depth);
            el.addEventListener('click', (event) => {
                this.selectedNode = node;
            });

            first = false;
            _parent.appendChild(el);



            this.createGraphRecursive(node.children, el);

        });
    }

    lineToChild() {



    }

}