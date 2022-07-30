import {Vector2} from "three"

// ------- Coordinates gen
function getCoordinatesWithinCircle(radius: number): Vector2 {
    const theta = 2 * Math.PI * Math.random()
    const r = radius * Math.pow(Math.random(), 0.5)
    const x = r * Math.cos(theta)
    const y = r * Math.sin(theta)
    return new Vector2(x, y)
}

function withinInnerCircle(coords: Vector2, center: number) {
    return (coords.x > -center && coords.x < center) && (coords.y > -center && coords.y < center)
}

function getCoordinatesWithinOuterCircle(radius: number, center: number): Vector2 {
    let position = getCoordinatesWithinCircle(radius)

    while (withinInnerCircle(position, center)) {
        position = getCoordinatesWithinCircle(radius)
    }

    return position
}

// ------- Positional
function outside(radius: number, x: number, y: number) {
    return pos(x, y) >= Math.pow(radius, 2)
}

function inside(radius: number, x: number, y: number) {
    return !outside(radius, x, y)
}

function pos(x: number, y: number) {
    return Math.pow(x, 2) + Math.pow(y, 2)
}

export {getCoordinatesWithinCircle, withinInnerCircle, getCoordinatesWithinOuterCircle, inside, outside, pos}