import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";

// https://simonharris.co/making-a-noise-film-grain-post-processing-effect-from-scratch-in-threejs/
// With slight modifications for vertical marks and flickering

function vertexShader() {
    return `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `
}

function fragmentShader() {
    return `
      uniform float amount;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
    
      float random( vec2 p )
      {
        vec2 K1 = vec2(
          23.14069263277926, // e^pi (Gelfond's constant)
          2.665144142690225 // 2^sqrt(2) (Gelfond-Schneider constant)
        );
        return fract( cos( dot(p,K1) ) * 12345.6789 );
      }
    
      void main() {
        vec4 color = texture2D( tDiffuse, vUv );
        vec2 uvRandom = vUv;
        uvRandom.x *= random(vec2(uvRandom.x, amount));
        uvRandom.y *= random(vec2(uvRandom.x, amount));
        color.rgb += random(uvRandom) * 0.07;
        color.rgb -= random(vec2(0.1, amount)) * 0.0035;
        gl_FragColor = vec4( color );
      }
  `
}

const vertShader = vertexShader()
const fragShader = fragmentShader()
let counter = 0.0
const filmGrain = {
    uniforms: {
        "tDiffuse": {value: null},
        "amount": {value: counter}
    },
    vertexShader: vertShader,
    fragmentShader: fragShader
}

function animateFilmGrain(filmGrainPass: ShaderPass, counterIncrement: number) {
    counter += counterIncrement
    filmGrainPass.uniforms["amount"].value = counter
}

export {filmGrain, animateFilmGrain}