import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer"
import {Camera, Scene, WebGLRenderer} from "three"
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass"
import {OnWindowResizeHandler} from "./WindowResizeHandler"

export class FragmentComposer extends EffectComposer implements OnWindowResizeHandler {
    constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
        super(renderer)

        this.configurePasses(scene, camera)
    }

    private configurePasses(scene: Scene, camera: Camera) {
        this.renderPass(scene, camera)
    }

    private renderPass(scene: Scene, camera: Camera) {
        const renderPass = new RenderPass(scene, camera)
        this.insertPass(renderPass, 0)
    }

    handleWindowResize() {
        this.setSize(window.innerWidth, window.innerHeight)
    }
}
