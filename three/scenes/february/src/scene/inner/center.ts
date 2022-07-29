import {Reflector} from "three/examples/jsm/objects/Reflector"
import {
    CircleBufferGeometry,
    Color,
    CylinderBufferGeometry,
    DoubleSide,
    MathUtils,
    Mesh,
    MeshBasicMaterial, Scene
} from "three"

function addCenter(scene: Scene) {
    const reflection: Reflector = new Reflector(
        new CircleBufferGeometry(21.8, 128),
        {
            color: new Color(0x777777),
            textureWidth: 512,
            textureHeight: 512
        }
    )
    reflection.position.setY(-0.27)
    reflection.rotateX(MathUtils.degToRad(-90))

    scene.add(reflection)

    const geometry = new CylinderBufferGeometry(21.73, 21.73, 0.55, 128, 1, true)
    const material = new MeshBasicMaterial({color: new Color(0x000000)})
    material.side = DoubleSide
    const mesh = new Mesh(geometry, material)
    mesh.position.setY(-0.3)
    scene.add(mesh)
}

export {addCenter}