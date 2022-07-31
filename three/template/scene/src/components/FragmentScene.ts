import {Color, Scene} from "three"

export class FragmentScene extends Scene {
    constructor() {
        super()

        this.background = new Color(0x101010)
    }
}