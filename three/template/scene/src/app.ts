import {AudioListener} from "three"
import {FragmentScene} from "./components/FragmentScene"
import {FragmentCamera} from "./components/FragmentCamera"
import {FragmentRenderer} from "./components/FragmentRenderer"
import {FragmentComposer} from "./components/FragmentComposer"
import {FragmentControls} from "./components/FragmentControls"
import {marker} from "../../../shared/utils/marker"

// region Init
// const framerate = 24
// const clock = new Clock()

const scene = new FragmentScene()

const audioListener = new AudioListener()
const camera = new FragmentCamera(audioListener)
const renderer = new FragmentRenderer()
const composer = new FragmentComposer(scene, camera, renderer)
const controls = new FragmentControls(camera, renderer.domElement, audioListener, onMovementListener)

// endregion Init

// region Objects
scene.add(marker(5, 5))
scene.add(marker(-5, -5))
scene.add(marker(-5, 5))
scene.add(marker(5, -5))
// endregion Objects

// region Movement
function onMovementListener() {
    console.log("onMovement")
}
// endregion Movement

// region Rendering
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.handleWindowResize()
    composer.handleWindowResize()
    renderer.handleWindowResize()
}

function animate() {
    requestAnimationFrame(animate)
    // ...
    controls.handleMovement()

    render()
}

function render() {
    composer.render()
}

animate()
// endregion Rendering
