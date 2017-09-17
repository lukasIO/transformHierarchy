import "lib/three";




export class Robot {

    constructor() {
        this.init();

    }

    //robot parts 
    root: THREE.Group = new THREE.Group();

    footLeft = new THREE.Mesh();
    footRight = new THREE.Mesh();

    legLeft = new THREE.Mesh();
    legRight = new THREE.Object3D();

    legAndFootLeft = new THREE.Group();
    legAndFootRight = new THREE.Group();

    legs = new THREE.Group();


    armsLeft = new THREE.Mesh();
    armsRight = new THREE.Mesh();

    arms = new THREE.Group();


    body = new THREE.Object3D();



    init() {

        var bodyGeo = new THREE.BoxGeometry(1, 1, 1);
        var limbGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
        var footGeo = new THREE.BoxGeometry(0.9, 0.2, 0.5);

        var material = new THREE.MeshLambertMaterial({ color: 0xffffff });


        this.legLeft = new THREE.Mesh(limbGeo, material);
        this.footLeft = new THREE.Mesh(footGeo, material);

        this.legRight = new THREE.Mesh(limbGeo, material);
        this.footRight = new THREE.Mesh(footGeo, material);

        this.armsLeft = new THREE.Mesh(limbGeo, material);
        this.armsRight = new THREE.Mesh(limbGeo, material);

        this.body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), material);
        this.body.position.set(0, 0, 0);

        this.legLeft.position.set(-0.5, -1.5, 0);
        this.legRight.position.set(0.5, -1.5, 0);

        this.footLeft.position.set(-0.75, -2, 0);
        this.footRight.position.set(0.75, -2, 0);

        this.armsLeft.position.set(-1, 1, 0);
        this.armsLeft.rotation.set(0, 0, -1);

        this.armsRight.position.set(1, 1, 0);
        this.armsRight.rotation.set(0, 0, 1);

        this.legAndFootLeft.add(this.legLeft);
        this.legAndFootLeft.add(this.footLeft);

        this.legAndFootRight.add(this.legRight);
        this.legAndFootRight.add(this.footRight);

        this.legs.add(this.legAndFootLeft);
        this.legs.add(this.legAndFootRight);

        this.arms.add(this.armsLeft);
        this.arms.add(this.armsRight);

        this.body.add(this.legs);
        this.body.add(this.arms);

        this.root.add(this.body);

    }




}







