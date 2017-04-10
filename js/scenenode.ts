
export class SceneNode {
    constructor(hierarchydepth: number) {
        this.depth = hierarchydepth;
    }
    isActive: boolean = false;
    hasTransform: boolean = false;
    children: SceneNode[] = [];
    depth: number = 0;

}

