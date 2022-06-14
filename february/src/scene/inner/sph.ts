import {
    Camera,
    Color,
    Group, MathUtils,
    Mesh,
    MeshPhongMaterial,
    Object3D,
    Quaternion,
    Scene,
    SphereBufferGeometry,
    Vector3
} from "three";
import {restoreCameraElevation} from "../../camera";
import {getCoordinatesWithinOuterCircle} from "../../utils/coordutils";

let sph: Object3D
let sphGroup: Group = new Group()
let whole = false

function createSph(scene: Scene) {
    const geometry = new SphereBufferGeometry()
    const material = new MeshPhongMaterial()
    material.color = new Color(0x171717)
    sph = new Mesh(geometry, material)
    sph.position.setY(1)
    sph.position.setZ(43.5)

    sphGroup.add(sph)
    scene.add(sphGroup)
}

function wholeness(camera: Camera) {
    sphGroup.add(camera)
    camera.position.copy(sph.position)
    sphGroup.remove(sph)

    const quaternion = new Quaternion()
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), MathUtils.degToRad(77))
    camera.setRotationFromQuaternion(quaternion)

    whole = true
}

function separation(camera: Camera, lookAway: boolean) {
    sphGroup.remove(camera)
    sphGroup.add(sph)

    restoreCameraElevation()

    if (!lookAway) {
        camera.position.x = camera.position.x + (camera.position.x / 7)
        camera.position.z = camera.position.z + (camera.position.z / 7)
        camera.lookAt(new Vector3(0, 0, 0))
    } else {
        const coords = getCoordinatesWithinOuterCircle(200, 100)
        camera.position.setX(coords.x)
        camera.position.setZ(coords.y)
    }

    whole = false
}

export {createSph, sphGroup, wholeness, separation, whole}