import {Color, CylinderBufferGeometry, MathUtils, Mesh, MeshBasicMaterial, Object3D} from "three"

function remap(inputMin: number, inputMax: number, outputMin: number, outputMax: number, val: number): number {
    const t = MathUtils.inverseLerp(inputMin, inputMax, val)
    return MathUtils.clamp(MathUtils.lerp(outputMin, outputMax, t), outputMin, outputMax)
}

function marker(x: number, z: number): Object3D {
    const geo = new CylinderBufferGeometry(0.2,0.2, 5)
    const material = new MeshBasicMaterial()
    material.color = new Color(0xffffff)
    const mesh = new Mesh(geo, material)
    mesh.position.x = x
    mesh.position.z = z
    return mesh
}

export{marker, remap}