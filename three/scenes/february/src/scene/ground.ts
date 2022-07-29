import {
    CircleBufferGeometry,
    Color,
    FrontSide,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Object3D, Scene
} from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

function makePlane(): Object3D {
    const geometry = new CircleBufferGeometry(1000, 30)
    const material = new MeshBasicMaterial()
    material.color = new Color(0x010101)
    const mesh = new Mesh(geometry, material)
    mesh.rotateX(MathUtils.degToRad(-90))
    mesh.position.setY(-1)
    return mesh
}


function addGround(scene: Scene) {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./res/obj/round_ground_ii.glb', (gltf) => {
        gltf.scene.traverse(function (sceneElement) {
            if ((sceneElement as Mesh).isMesh) {
                const groundMesh = sceneElement as Mesh
                const material = new MeshPhongMaterial()
                material.color = new Color(0xFFFFFF)
                material.emissive = new Color(0xFFFFFF)
                material.emissiveIntensity = 0.17
                material.side = FrontSide
                material.shininess = 0.0
                groundMesh.material = material
            }
        })
        const root = gltf.scene
        scene.add(root)
    })
}

export {makePlane, addGround}