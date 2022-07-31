import {Color, CylinderBufferGeometry, Mesh, MeshBasicMaterial, Object3D} from "three";

export function marker(x: number, z: number): Object3D {
    const geo = new CylinderBufferGeometry(0.2,0.2, 5)
    const material = new MeshBasicMaterial()
    material.color = new Color(0xffffff)
    const mesh = new Mesh(geo, material)
    mesh.position.x = x
    mesh.position.z = z

    return mesh
}