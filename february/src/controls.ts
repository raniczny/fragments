import {AudioListener, Camera} from "three"
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"

export class Controls {
    private readonly pointerLockControls: PointerLockControls
    private readonly keyEvents = this.getKeyEvents()
    private readonly camera: Camera
    private readonly onMovementEventListener
    private slowdownFactor = 1

    constructor(camera: Camera, canvas: HTMLElement, audioListener: AudioListener, onMovementListener: any) {
        this.camera = camera
        this.onMovementEventListener = onMovementListener

        this.pointerLockControls = new PointerLockControls(camera, canvas)

        document.addEventListener('mousedown', () => {
            audioListener.context.resume()
            this.pointerLockControls.lock()
        })
        this.pointerLockControls.addEventListener('change', this.onMovementEventListener)
    }

    getKeyEvents() {
        const keys: any = []

        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        function keydown(key: any) {
            keys[key.keyCode] = true
        }

        function keyup(key: any) {
            keys[key.keyCode] = false
        }

        return keys
    }

    handleMovement() {
        const speed = (this.keyEvents['16'] ? .3 : .13) * this.slowdownFactor // shift

        if (this.keyEvents['87']) {  // w
            this.pointerLockControls.moveForward(speed)
            this.onMovementEventListener()
        }
        if (this.keyEvents['83']) {  // s
            this.pointerLockControls.moveForward(-speed)
            this.onMovementEventListener()
        }
        if (this.keyEvents['65']) {  // a
            this.pointerLockControls.moveRight(-speed)
            this.onMovementEventListener()
        }
        if (this.keyEvents['68']) {  // d
            this.pointerLockControls.moveRight(speed)
            this.onMovementEventListener()
        }
    }

    setSlowdownFactor(factor: number) {
        this.slowdownFactor = factor
    }
}
