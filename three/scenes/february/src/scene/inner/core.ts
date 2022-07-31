import {
    BufferGeometry,
    Color,
    MathUtils, Mesh, MeshBasicMaterial,
    Object3D,
    Points,
    PointsMaterial, Scene, SphereBufferGeometry,
    Vector3
} from "three"
import {startGlowing, stopGlowing} from "../../composer"

let vertices: Vector3[] = []
const geometry = new BufferGeometry()

const aura = makeAura()
aura.position.setY(11)

const core = makeCore()

function makeAura(): Points {
    particles()
    arcs()

    geometry.setFromPoints(vertices)
    const material = new PointsMaterial({color: 0xf9f9f9, sizeAttenuation: false})
    material.size = window.devicePixelRatio * 2
    return new Points(geometry, material)
}

function particles() {
    for (let i = 0; i < 360; i++) {
        const s = MathUtils.randFloatSpread(i)

        const n = 7
        const d = 3
        const rmax = MathUtils.randInt(0, 15)

        const r = rmax * Math.cos(n / d * s)
        const x = r * Math.sin(s)
        const y = r * Math.cos(s)
        const z = Math.tan(s * n)

        vertices.push(new Vector3(x, y, z))
    }
}

function arcs() {
    for (let i = 0; i < 720; i++) {
        const s = MathUtils.randFloatSpread(i)

        const n = 7
        const d = 3
        const rmax = 11

        const r = rmax * Math.cos(n / d * s)
        const x = r * Math.sin(s)
        const y = r * Math.cos(s)
        const z = Math.tan(s * n)

        vertices.push(new Vector3(x, y, z))
    }
}

function makeCore(): Object3D {
    const geometry = new SphereBufferGeometry()
    const material = new MeshBasicMaterial()
    material.color = new Color(0xf9f9f9)
    const core = new Mesh(geometry, material)
    core.position.setY(11)
    core.scale.set(3, 3, 3)

    return core
}

export function animateCore() {
    aura.geometry.dispose()
    vertices = []
    particles()
    arcs()
    aura.geometry.setFromPoints(vertices)
    aura.rotateX(MathUtils.degToRad(9.133))
    aura.rotateZ(MathUtils.degToRad(11.333))
    aura.rotateY(MathUtils.degToRad(53.21))
}

export function revealCore(scene: Scene) {
    scene.add(core)
    scene.add(aura)
    startGlowing()
}

export function concealCore(scene: Scene) {
    scene.remove(core)
    scene.remove(aura)
    stopGlowing()
}
