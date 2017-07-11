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

    lines = jsPlumb; //reference to line library, globally added in html
    commonLine; //object for shared line settings



    init() {
        this.graph = this.traverseGraph(this._root, 0);

        this.container.classList.add("graphContainer");
        this.container.id = "graph";
        //this.container.style.width = "50%";
        //this.container.style.height = "100%";
        var contentWrapper = document.getElementById("contentwrapper");
        contentWrapper.appendChild(this.container);
        this.lines.importDefaults({
            ConnectionsDetachable: false
        });
        this.commonLine = {
            anchors: ["BottomCenter", "TopCenter"],
            endpoint: "Blank",
            connector: ["StateMachine", { curviness: 5 }]
        };

        var self = this;

        window.onresize = () => function () {
            self.lines.repaintEverything();
        }

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
        this.createGraphRecursive(this.graph, this.container, true);

        //$('.child').connections('update');
        jsPlumb.repaintEverything();

    }

    printGraphRecursive(_nodes: SceneNode[]) {
        _nodes.forEach((node) => {
            console.log(node.depth);
            console.log(node);
            this.printGraphRecursive(node.children);
        });
    }

    createGraphRecursive(_nodes: SceneNode[], _parent: HTMLElement, isRoot = false) {

        _nodes.forEach((node) => {


            let el: HTMLDivElement = document.createElement('div');
            el.innerHTML = String(node.threeObject.name);
            if (node.transformType == 2) {
                el.classList.add("graphButtonGroup");
            }
            else {
                el.classList.add("graphButton")
            }
            el.classList.add("child");

            //el.style.paddingRight = ((node.children.length - 1) * 55) + "px";

            let childrenContainer: HTMLDivElement = document.createElement("div");
            //childrenContainer.style.width = (node.children.length * 55) + "px";

            childrenContainer.classList.add("childrenContainer");

            //el.classList.add("depth_" + node.depth);

            //el.style.width = (100 / node.children.length) + "%";

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

            childrenContainer.appendChild(el);
            _parent.appendChild(childrenContainer);

            //$(_parent).connections({ to: $(el) });
            if (!isRoot) {
                this.lines.connect(
                    {
                        source: _parent.firstChild,
                        target: el

                    }, this.commonLine
                );
            }

            this.createGraphRecursive(node.children, childrenContainer);

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