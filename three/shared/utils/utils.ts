import {MathUtils} from "three"

export function remap(inputMin: number, inputMax: number, outputMin: number, outputMax: number, val: number): number {
    const t = MathUtils.inverseLerp(inputMin, inputMax, val)
    return MathUtils.clamp(MathUtils.lerp(outputMin, outputMax, t), outputMin, outputMax)
}
