import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"
import {AudioListener, Camera} from "three"

export type OnMovementListener = () => void

const forward = "KeyW"
const back = "KeyS"
const left = "KeyA"
const right = "KeyD"
const faster = "ShiftLeft"

const keyMap = new Map<string, boolean>([
    [forward, false],
    [back, false],
    [left, false],
    [right, false],
    [faster, false]
])

export class FragmentControls extends PointerLockControls {
    private readonly onMovementEventListener: OnMovementListener

    constructor(camera: Camera, canvas: HTMLElement, audioListener: AudioListener, onMovementListener: OnMovementListener) {
        super(camera, canvas)

        this.onMovementEventListener = onMovementListener
        this.addEventListener('change', onMovementListener)
        this.addOnMouseDownListener(audioListener)
        this.addKeyboardInputListener()
    }

    private addOnMouseDownListener(audioListener: AudioListener) {
        document.addEventListener('mousedown', () => {
            audioListener.context.resume()
            this.lock()
        })
    }

    private addKeyboardInputListener() {
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        function keydown(key: KeyboardEvent) {
            if (keyMap.has(key.code)) {
                keyMap.set(key.code, true)
            }
        }

        function keyup(key: KeyboardEvent) {
            if (keyMap.has(key.code)) {
                keyMap.set(key.code, false)
            }
        }
    }

    handleMovement() {
        const speed = (keyMap.get(faster) ? .3 : .13)

        if (keyMap.get(forward)) {
            this.moveForward(speed)
            this.onMovementEventListener()
        }

        if (keyMap.get(back)) {
            this.moveForward(-speed)
            this.onMovementEventListener()
        }

        if (keyMap.get(left)) {
            this.moveRight(-speed)
            this.onMovementEventListener()
        }

        if (keyMap.get(right)) {
            this.moveRight(speed)
            this.onMovementEventListener()
        }
    }
}