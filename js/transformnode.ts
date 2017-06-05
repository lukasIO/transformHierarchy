
export enum ttype { translate, rotate, scale };

export class Transform extends THREE.Object3D {
    constructor(_transformType: ttype) {
        super();
        this.transformType = _transformType;
    }

    transformType: ttype
    type = "Transform";

}