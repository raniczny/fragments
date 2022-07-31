import {Audio, AudioListener} from "three"
import {FragmentAudioLoader} from "./FragmentAudioLoader"

export class FragmentAudio extends Audio {
    constructor(audioListener: AudioListener, audioFile: string) {
        super(audioListener)

        this.loadAudio(audioFile)
    }

    private loadAudio(audioFile: string) {
        FragmentAudioLoader.getInstance().load(audioFile, (buffer) => {
            this.setBuffer(buffer)
            this.setLoop(true)
            this.setVolume(3)
        })
    }
}
