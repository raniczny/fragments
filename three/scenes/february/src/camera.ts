import {Camera, MathUtils, PerspectiveCamera} from "three"

const HEIGHT = 1.94

let camera: Camera

export function createCamera(): Camera {
    camera = new PerspectiveCamera(
        48.6,
        window.innerWidth / window.innerHeight,
        0.1,
        20000
    )
    camera.position.y = HEIGHT
    camera.rotation.order = 'YXZ'

    configCamera()

    return camera
}

function configCamera() {
    camera.rotateY(MathUtils.degToRad(MathUtils.randFloatSpread(360)))
    const camDegree = MathUtils.randFloatSpread(360)
    const camPositionX = (Math.sin(MathUtils.degToRad(camDegree) + MathUtils.randFloat(0.5, 1.1)) * 200)
    const camPositionZ = (Math.cos(MathUtils.degToRad(camDegree) + MathUtils.randFloat(0.5, 1.1)) * 200)
    camera.position.setX(camPositionX)
    camera.position.setZ(camPositionZ)
}

export function restoreCameraElevation() {
    camera.position.y = HEIGHT
}
