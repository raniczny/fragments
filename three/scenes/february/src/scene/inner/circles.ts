import {MathUtils, Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry, TextureLoader} from "three"

function circles(textureLoader: TextureLoader): Object3D {
    const texture = textureLoader.load('./res/img/circles_iii.png')
    const material = new MeshBasicMaterial({map: texture})
    material.transparent = true

    const geometry = new PlaneBufferGeometry(100,100)
    const mesh = new Mesh(geometry, material)

    mesh.rotation.x = MathUtils.degToRad(-90)
    mesh.position.setY(-0.05)

    return mesh
}

export {circles}