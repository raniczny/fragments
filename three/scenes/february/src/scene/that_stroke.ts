import {DoubleSide, MathUtils, Mesh, MeshBasicMaterial, Object3D, PlaneBufferGeometry, TextureLoader} from "three"

function makeThatStroke(textureLoader: TextureLoader): Object3D {
    const geometry = new PlaneBufferGeometry(64, 42)
    const texture = textureLoader.load('./res/img/that_stroke.png')
    const material = new MeshBasicMaterial({map: texture})
    material.transparent = true
    material.opacity = 0.7
    material.side = DoubleSide

    const thatStroke = new Mesh(geometry, material)

    thatStroke.rotateY(MathUtils.degToRad(-30))
    thatStroke.rotateX(MathUtils.degToRad(90))
    thatStroke.rotateZ(MathUtils.degToRad(90))
    thatStroke.position.setY(800)
    thatStroke.position.setZ(100)
    thatStroke.position.setX(1000)

    return thatStroke
}

export {makeThatStroke}