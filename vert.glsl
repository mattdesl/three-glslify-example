varying vec3 vNorm;
varying vec2 vUv;
void main() {
  vUv = uv;
  vNorm = position.xyz;
  gl_Position = projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
}
