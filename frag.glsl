#extension GL_OES_standard_derivatives : enable

varying vec3 vNorm;
varying vec2 vUv;
uniform float iGlobalTime;
uniform sampler2D iChannel0;

#define TEXEL_SIZE 1.0/512.0 

vec3 sample(vec2 uv);
#pragma glslify: blur = require('glsl-hash-blur', sample=sample, iterations=10)
#pragma glslify: halftone = require('glsl-halftone')
#pragma glslify: checker = require('glsl-checker')

vec3 sample(vec2 uv) {
  return texture2D(iChannel0, uv).rgb;
}

void main() {
  vec3 color = vec3(0.0);

  //the checker box
  if (vNorm.z < 0.4) {
    color = vNorm * 0.5 + 0.5;
    color += vec3(checker(vUv, 15.0)) * 0.05;
  } 
  //our texture with halftone + hash blur
  else {
    float dist = length(vUv - 0.5);
    float falloff = smoothstep(0.3, 0.7, dist);
    float radius = TEXEL_SIZE * 40.0;
    radius *= falloff;
    color = blur(vUv, radius, 1.0);
    falloff = smoothstep(0.5, 0.0, dist);
    color = mix(color, halftone(color, vUv, 35.0), falloff);
  }
  
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.0;
}