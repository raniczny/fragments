import {DirectionalLight, Scene} from "three";

function addLights(scene: Scene)  {
    const dirLight = new DirectionalLight()
    dirLight.intensity = 0.17
    dirLight.position.set(0, 21, 100)
    scene.add(dirLight)
}

export {addLights}