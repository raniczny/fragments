import {Audio, AudioListener} from "three"
import {FragmentAudioLoader} from "./FragmentAudioLoader"

export class FragmentAudio extends Audio {
    constructor(audioListener: AudioListener, audioFile: string, looped?: boolean, initVolume?: number) {
        super(audioListener)

        this.loadAudio(audioFile, looped, initVolume)
    }

    private loadAudio(audioFile: string, looped?: boolean, initVolume?: number) {
        FragmentAudioLoader.getInstance().load(audioFile, (buffer) => {
            this.setBuffer(buffer)
            looped ? this.setLoop(looped) : this.setLoop(false)
            initVolume ? this.setVolume(initVolume) : this.setVolume(1)
        })
    }
}
