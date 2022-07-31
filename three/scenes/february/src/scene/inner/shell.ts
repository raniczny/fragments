import {Color, CylinderBufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, Object3D} from "three"

export function shell(): Object3D {
    const geometry = new CylinderBufferGeometry(70, 70, 20, 128, 1, true)
    const material = new MeshBasicMaterial()
    material.color = new Color(0x000000)
    material.side = DoubleSide
    return new Mesh(geometry, material)
}
