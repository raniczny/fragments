import {sRGBEncoding, WebGLRenderer} from "three";

let renderer: WebGLRenderer

function createRenderer(): WebGLRenderer {
    renderer = new WebGLRenderer()
    renderer.setPixelRatio(0.5)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = sRGBEncoding;

    attachRenderer()

    return renderer
}

function attachRenderer() {
    document.body.appendChild(renderer.domElement)
}

export {createRenderer}