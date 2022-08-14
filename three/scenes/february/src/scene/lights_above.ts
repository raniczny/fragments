import {BufferGeometry, Float32BufferAttribute, MathUtils, Object3D, Points, PointsMaterial} from "three"

export function makeLightsAbove(): Object3D {
    const vertices = []

    for (let i = 0; i < 28; i++) {
        const x = MathUtils.randFloatSpread(4000)
        const y = MathUtils.randFloat(300, 700)
        const z = MathUtils.randFloat(-4000, 2000)

        vertices.push(x, y, z)
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    const material = new PointsMaterial({color: 0xffffff, size: 2, sizeAttenuation: false})
    return new Points(geometry, material)
}
