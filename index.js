const THREE = require('three')
const createOrbitViewer = require('three-orbit-viewer')(THREE)
const glslify = require('glslify')

//our basic full-screen application and render loop
let time = 0
const app = createOrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1.0,
  fov: 65,
  position: new THREE.Vector3(0.85, 1, -1.5)
})

//load up a test image
const tex = THREE.ImageUtils.loadTexture('baboon.png', undefined, ready)

//here we create a custom shader with glslify
//note USE_MAP is needed to get a 'uv' attribute
const mat = new THREE.ShaderMaterial({
  vertexShader: glslify('./vert.glsl'),
  fragmentShader: glslify('./frag.glsl'),
  uniforms: {
    iChannel0: { type: 't', value: tex },
    iGlobalTime: { type: 'f', value: 0 }
  },
  defines: {
    USE_MAP: ''
  }
})

//make a box, hidden until the texture has loaded
const geo = new THREE.BoxGeometry(1, 1, 1)
const box = new THREE.Mesh(geo, mat)
box.visible = false
box.rotation.y = -Math.PI
app.scene.add(box)

//provide our shader with iGlobalTime for cool effects
app.on('tick', dt => {
  time += dt / 1000
  mat.uniforms.iGlobalTime.value = time
})

//once texture is ready, show our box
function ready() {
  box.visible = true
}