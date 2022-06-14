import {
    Audio, AudioListener, AudioLoader,
    Clock, Color,
    PerspectiveCamera,
    Scene, TextureLoader, Vector2,
} from "three"

import {addLights} from "./lights"
import {createRenderer} from "./renderer"
import {createCamera} from "./camera"
import {Controls} from "./controls"
import {inside, outside, pos} from "./utils/coordutils"
import {animateFilmGrain} from "./shaders/film_grain_shader"
import {createComposer, filmGrainPass} from "./composer"
import {makeThisStroke} from "./scene/this_stroke"
import {makeThatStroke} from "./scene/that_stroke"
import {makeLightsAbove} from "./scene/lights_above"
import {animateCore, revealCore, concealCore} from "./scene/inner/core"
import {addCenter} from "./scene/inner/center"
import {circles} from "./scene/inner/circles"
import {moveLights, movingLights} from "./scene/moving_lights"
import {makeDistantLights} from "./scene/distant_lights"
import {createSph, separation, sphGroup, whole, wholeness} from "./scene/inner/sph"
import {shell} from "./scene/inner/shell"
import {addGround, makePlane} from "./scene/ground"
import {createThatForest} from "./scene/that_forest"
import {createThisForest} from "./scene/this_forest"
import {remap} from "./utils/utils"

// region Init
const framerate = 24

const clock = new Clock()

const scene = new Scene()
scene.background = new Color(0x101010)

const camera = createCamera() as PerspectiveCamera

const renderer = createRenderer()

const composer = createComposer(scene, camera, renderer)

const audioListener = new AudioListener()
const audioLoader = new AudioLoader()
camera.add(audioListener)

const controls = new Controls(camera, renderer.domElement, audioListener, onMovement)

const textureLoader = new TextureLoader()
// endregion Init

// region Objects
addLights(scene)

const distantStroke = makeThatStroke(textureLoader)
scene.add(distantStroke)

const lightsAbove = makeLightsAbove()
lightsAbove.position.setX(camera.position.x)
lightsAbove.position.setZ(camera.position.z)
scene.add(lightsAbove)

scene.add(makeThisStroke(textureLoader))

scene.add(makePlane())
addGround(scene)

createThisForest(scene)
createThatForest(scene, textureLoader)

scene.add(makeDistantLights())
scene.add(movingLights)

scene.add(circles(textureLoader))
createSph(scene)
scene.add(shell())
addCenter(scene)
// endregion Objects

// region Sound
async function createReverb(): Promise<ConvolverNode> {
    let convolver = audioListener.context.createConvolver()

    let response = await fetch("./res/sound/proc/proc_rev_01.wav")
    let arraybuffer = await response.arrayBuffer()
    convolver.buffer = await audioListener.context.decodeAudioData(arraybuffer)

    return convolver
}

const amb = new Audio(audioListener)
audioLoader.load('./res/sound/obj/amb.mp3', function (buffer) {
    amb.setBuffer(buffer)
    amb.setLoop(true)
    amb.setVolume(10)
    amb.play(0)
})

const so0 = new Audio(audioListener)
audioLoader.load('./res/sound/obj/so0.mp3', function (buffer) {
    so0.setLoop(true)
    so0.setBuffer(buffer)
    so0.setVolume(0)
})

const so1 = new Audio(audioListener)
audioLoader.load('./res/sound/obj/so1.mp3', function (buffer) {
    so1.setBuffer(buffer)
    so1.setVolume(3)
})

const so2 = new Audio(audioListener)
audioLoader.load('./res/sound/obj/so2.mp3', function (buffer) {
    so2.setBuffer(buffer)
    so2.setVolume(0.33)
})

createReverb().then((reverb => {
    so2.setFilter(reverb)
}))

const so3 = new Audio(audioListener)
audioLoader.load('./res/sound/obj/so3.mp3', function (buffer) {
    so3.setBuffer(buffer)
    so3.setVolume(0)
})

createReverb().then((reverb => {
    so3.setFilter(reverb)
}))
// endregion Sound

// region Movement
let slowdown = 1

const distantStrokeInitialPosition = new Vector2(distantStroke.position.x, distantStroke.position.z)
function onMovement() {
    // begin prevent parallax effect on very distant objects
    lightsAbove.position.setX(camera.position.x)
    lightsAbove.position.setZ(camera.position.z)
    distantStroke.position.setX(distantStrokeInitialPosition.x + camera.position.x)
    distantStroke.position.setZ(distantStrokeInitialPosition.y + camera.position.z)
    // end prevent parallax effect on very distant objects

    pos(camera.position.x, camera.position.z)

    if (inside(71.5, camera.position.x, camera.position.z)) {
        if (!so0.isPlaying) {
            so0.play(0)
        }

        const vol = remap(4990, 4800, 0, 2.5, pos(camera.position.x, camera.position.z))
        so0.setVolume(vol)
    } else {
        if (so0.isPlaying) {
            so0.setVolume(0)
            so0.stop()
        }
    }

    if (inside(49, camera.position.x, camera.position.z)) {
        if (!whole) {
            if (!so1.isPlaying) {
                so1.setLoop(true)
                so1.play(7)
            }

            slowdown = 0.05
            controls.setSlowdownFactor(slowdown)

            wholeness(camera)
            revealCore(scene)
        }
    } else {
        if (whole) {
            if (so1.isPlaying) {
                so1.setLoop(false)
            }

            slowdown = 1
            controls.setSlowdownFactor(slowdown)

            separation(camera, false)
            concealCore(scene)
        }
    }

    if (inside(41, camera.position.x, camera.position.z)) {
        if (!so2.isPlaying) {
            so2.setLoop(true)
            so2.play()
        }
    } else {
        if (so2.isPlaying) {
            so2.setLoop(false)
        }
    }

    if (inside(37, camera.position.x, camera.position.z)) {
        if (!so3.isPlaying) {
            so3.setLoop(true)
            so3.play()
        }

        const vol = remap(1550, 500, 0, 1, pos(camera.position.x, camera.position.z))
        so3.setVolume(vol)
    } else {
        if (so3.isPlaying) {
            so3.setLoop(false)
            so3.setVolume(0)
        }
    }

    if (inside(21.5, camera.position.x, camera.position.z)) {
        if (whole) {
            so1.setLoop(false)
            so0.setVolume(0)

            slowdown = 1
            controls.setSlowdownFactor(slowdown)

            separation(camera, true)
            concealCore(scene)
        }
    }

    if (outside(270, camera.position.x, camera.position.z)) {
        if (slowdown > 0) {
            slowdown -= 0.01
        }
        controls.setSlowdownFactor(slowdown)

        if (slowdown <= 0) {
            camera.position.set(camera.position.x - (camera.position.x / 5), camera.position.y, camera.position.z - (camera.position.z / 5))
            slowdown = 1
            controls.setSlowdownFactor(slowdown)
        }
    }
}
// endregion Movement

// region Rendering
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    composer.setSize(window.innerWidth, window.innerHeight)
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.render()
}

function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate)
        animateFilmGrain(filmGrainPass, 0.001)
        controls.handleMovement()

        const delta = clock.getDelta()
        const speedFactor = whole ? 5 : 3

        moveLights(clock, delta)

        sphGroup.rotation.y -=  delta / speedFactor

        if (whole) {
            animateCore()
        }

        render()
    }, 1000 / framerate)
}

function render() {
    composer.render()
}

animate()
// endregion Rendering