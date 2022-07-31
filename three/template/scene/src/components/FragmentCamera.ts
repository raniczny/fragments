import {AudioListener, PerspectiveCamera} from "three"

const height = 2
const rotationOrder = 'YXZ'

export class FragmentCamera extends PerspectiveCamera {
    constructor(audioListener: AudioListener) {
        super()

        this.fov = 48.6
        this.aspect = window.innerWidth / window.innerHeight
        this.near = 0.1
        this.far = 10000

        this.rotation.order = rotationOrder
        this.position.y = height

        this.attachAudioListener(audioListener)
    }

    private attachAudioListener(audioListener: AudioListener) {
        this.add(audioListener)
    }

    handleWindowResize() {
        this.aspect = window.innerWidth / window.innerHeight
        this.updateProjectionMatrix()
    }
}
