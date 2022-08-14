import {Color, CylinderBufferGeometry, Mesh, MeshBasicMaterial} from "three"

export class Marker extends Mesh {
    constructor(x: number, z: number, y = 0) {
        super()

        this.geometry = new CylinderBufferGeometry(0.2, 0.2, 5)
        this.material = new MeshBasicMaterial({color: new Color(0xffffff)})

        this.position.x = x
        this.position.z = z
        this.position.y = y
    }
}