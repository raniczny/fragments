import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer"
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass"
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass"
import {filmGrain} from "../../../shared/shaders/film_grain_shader"
import {SMAAPass} from "three/examples/jsm/postprocessing/SMAAPass"
import {Camera, Scene, Vector2, WebGLRenderer} from "three"
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass"

let composer: EffectComposer
let renderPass: RenderPass
let bloomPass: UnrealBloomPass
let filmGrainPass: ShaderPass
let smaaPass: SMAAPass

function createComposer(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
    composer = new EffectComposer(renderer)
    configPasses(scene, camera)

    return composer
}

function configPasses(scene: Scene, camera: Camera) {
    renderPass = new RenderPass(scene, camera)
    composer.insertPass(renderPass, 0)

    const bpres = new Vector2(window.innerWidth, window.innerHeight)
    const bpstrength = 0.5
    const bpradius = 0.25
    const bpthreshold = 0.1
    bloomPass = new UnrealBloomPass(bpres, bpstrength, bpradius, bpthreshold)
    bloomPass.strength = bpstrength
    bloomPass.radius = bpradius
    bloomPass.threshold = bpthreshold

    filmGrainPass = new ShaderPass(filmGrain)
    filmGrainPass.renderToScreen = true
    composer.insertPass(filmGrainPass, 2)

    smaaPass = new SMAAPass(window.innerWidth, window.innerHeight)
    composer.insertPass(smaaPass, 3)
}

let glowing = false

function startGlowing() {
    if (!glowing) {
        composer.insertPass(bloomPass, 1)
        glowing = true
    }
}

function stopGlowing() {
    if (glowing) {

        composer.removePass(bloomPass)
        glowing = false
    }
}

export {createComposer, filmGrainPass, stopGlowing, startGlowing}