import {sRGBEncoding, WebGLRenderer} from "three"

let renderer: WebGLRenderer

export function createRenderer(): WebGLRenderer {
    renderer = new WebGLRenderer()
    renderer.setPixelRatio(0.5)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = sRGBEncoding

    attachCanvas()

    return renderer
}

function attachCanvas() {
    document.body.appendChild(renderer.domElement)
}
