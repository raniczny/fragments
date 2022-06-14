import {Clock, DoubleSide, Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry} from "three"

const movingLights: Object3D = makeMovingLights()

function makeMovingLights(): Object3D {
    const geometry = new PlaneBufferGeometry(130, 5)
    const material = new MeshBasicMaterial()
    material.side = DoubleSide
    const mesh = new Mesh(geometry, material)
    mesh.position.setZ(-1500)
    mesh.position.setX(15000)
    mesh.position.setY(-2)

    return mesh
}

let newPosition = 0
let move = false
function moveLights(clock: Clock, delta: number) {
    if (move) {
        newPosition = (movingLights.position.x - delta * 500)
        movingLights.position.setX(newPosition)
        if (movingLights.position.x < -15000) {
            movingLights.position.setX(15000)
            move = false
        }
    }

    if (Math.floor(clock.getElapsedTime()) % 120 == 0) {
        move = true
    }
}

export {movingLights, moveLights}