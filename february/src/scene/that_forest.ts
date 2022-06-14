import {MathUtils, Scene, Sprite, SpriteMaterial, TextureLoader} from "three";

const texture = './res/img/i_am_a_forest.png'

function createThatForest(scene: Scene, textureLoader: TextureLoader) {
    const map = textureLoader.load(texture)
    const material = new SpriteMaterial({map: map, color: 0x555555})
    material.rotation = -0.11
    material.uuid = MathUtils.generateUUID()

    const degreeOffset = 55
    let degree = 0
    const maxDegree = 175
    const forestSize = 2000

    for (let i = 0; i <= forestSize; i++) {
        const xPosition = (Math.sin(MathUtils.degToRad(degree + degreeOffset) + MathUtils.randFloat(0, 1)) * 1000)
        const zPosition = (Math.cos(MathUtils.degToRad(degree + degreeOffset) + MathUtils.randFloat(0.1, 1.1)) * 1000)

        degree++
        if (degree == maxDegree) {
            degree = 0
        }

        const scale = MathUtils.randFloat(10, 27)
        const sprite = new Sprite(material)
        sprite.scale.set(scale, scale * 2, scale)
        sprite.position.setY(scale - 1)
        sprite.position.setX(xPosition)
        sprite.position.setZ(zPosition)
        sprite.renderOrder = 1 // Trees sprites need to be rendered first, otherwise they'll appear in black rectangles against clouds

        scene.add(sprite)
    }
}

export {createThatForest}