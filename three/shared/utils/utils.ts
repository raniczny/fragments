import {MathUtils} from "three"

function remap(inputMin: number, inputMax: number, outputMin: number, outputMax: number, val: number): number {
    const t = MathUtils.inverseLerp(inputMin, inputMax, val)
    return MathUtils.clamp(MathUtils.lerp(outputMin, outputMax, t), outputMin, outputMax)
}

export{remap}