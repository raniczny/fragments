import {BufferGeometry, Color, MathUtils, Matrix4, Mesh, MeshBasicMaterial, Scene} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {getCoordinatesWithinOuterCircle} from "../utils/coordutils";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

function createThisForest(scene: Scene) {
    const model = ["./res/obj/i_am_a_forest.glb"]
    const treeGeometries: BufferGeometry[] = []
    const gltfLoader = new GLTFLoader()
    const radius = 250
    const center = 27
    const elevation = -0.25
    const last = 360

    for (let i = 0; i <= last; i++) {
        const modelIndex = MathUtils.randInt(0, model.length - 1)
        const modelUrl = model[modelIndex]
        const coords = getCoordinatesWithinOuterCircle(radius, center)
        const yPosition = elevation
        const xPosition = coords.x
        const zPosition = coords.y
        const rotation = MathUtils.randFloatSpread(360)
        const scale = MathUtils.randFloat(1, 3.7)

        gltfLoader.load(
            modelUrl,
            (gltf) => {
                gltf.scene.traverse(function (sceneElement) {
                    if ((sceneElement as Mesh).isMesh) {
                        const geometry = (sceneElement as Mesh).geometry
                        geometry.rotateY(rotation)
                        geometry.scale(scale, scale, scale)
                        geometry.applyMatrix4(new Matrix4().makeTranslation(xPosition, yPosition, zPosition))
                        treeGeometries.push(geometry)
                    }
                })

                if (i == last && treeGeometries.length > 0) {
                    scene.add(makeMergedTreesMesh(treeGeometries))
                }
            })
    }
}

function makeMergedTreesMesh(treeGeometries: BufferGeometry[]): Mesh {
    const mergedTreeGeometries = mergeBufferGeometries(treeGeometries)

    const treeMesh = new Mesh(mergedTreeGeometries)
    const material = new MeshBasicMaterial()
    material.color = new Color(0x020202)
    treeMesh.material = material
    return treeMesh
}

export {createThisForest}