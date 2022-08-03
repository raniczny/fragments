import {sRGBEncoding, WebGLRenderer} from "three"
import {OnWindowResizeHandler} from "./WindowResizeHandler";

export class FragmentRenderer extends WebGLRenderer implements OnWindowResizeHandler {
    constructor() {
        super()

        this.setPixelRatio(0.5)
        this.setSize(window.innerWidth, window.innerHeight)
        this.outputEncoding = sRGBEncoding

        this.attachCanvas()
    }

    private attachCanvas() {
        document.body.appendChild(this.domElement)
    }

    handleWindowResize() {
        this.setSize(window.innerWidth, window.innerHeight)
    }
}