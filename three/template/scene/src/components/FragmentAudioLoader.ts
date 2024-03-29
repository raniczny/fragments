import {AudioLoader} from "three"

export class FragmentAudioLoader extends AudioLoader {
    private static INSTANCE: FragmentAudioLoader

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.INSTANCE == null) {
            this.INSTANCE = new FragmentAudioLoader()
        }
        return this.INSTANCE
    }
}
