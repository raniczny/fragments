import {DoubleSide, MathUtils, Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry, TextureLoader} from "three"

function makeThisStroke(textureLoader: TextureLoader): Object3D {
    const geometry = new PlaneBufferGeometry(17000, 13000)
    const texture = textureLoader.load('./res/img/this_stroke.png')
    const material = new MeshBasicMaterial({map: texture})
    material.transparent = true
    material.opacity = 0.33
    material.side = DoubleSide

    const mesh = new Mesh(geometry, material)

    mesh.rotateX(MathUtils.degToRad(-85))
    mesh.rotateZ(MathUtils.degToRad(17))
    mesh.position.setY(690)
    mesh.position.setZ(4900)

    return mesh
}

export {makeThisStroke}