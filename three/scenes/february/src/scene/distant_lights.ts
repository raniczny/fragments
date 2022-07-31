import {BufferGeometry, Float32BufferAttribute, MathUtils, Object3D, Points, PointsMaterial} from "three"

const distantLightDegreeOffset = 100
let distantLightDegree = 0
const distantLightMaxDegree = 99

export function makeDistantLights(): Object3D {
    const vertices = []

    for (let i = 0; i < 77; i++) {
        const xPosition = (Math.sin(MathUtils.degToRad(distantLightDegree + distantLightDegreeOffset) + MathUtils.randFloat(0, 1)) * -10000)
        const zPosition = (Math.cos(MathUtils.degToRad(distantLightDegree + distantLightDegreeOffset) + MathUtils.randFloat(0.1, 1.1)) * -10000)
        distantLightDegree++
        if (distantLightDegree == distantLightMaxDegree) {
            distantLightDegree = 0
        }

        vertices.push(xPosition, 0.1, zPosition)
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    const material = new PointsMaterial({color: 0xffffff, sizeAttenuation: false})
    material.size = window.devicePixelRatio
    return new Points(geometry, material)
}
