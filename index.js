var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)
var glslify = require('glslify')

var time = 0
var app = createOrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1.0,
  fov: 65,
  position: new THREE.Vector3(0.85, 1, -1.5)
})

var tex = THREE.ImageUtils.loadTexture('baboon.png', undefined, ready)
var geo = new THREE.BoxGeometry(1, 1, 1)
var mat = new THREE.ShaderMaterial({
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

var box = new THREE.Mesh(geo, mat)
box.visible = false
app.scene.add(box)

box.rotation.y = -Math.PI

app.on('tick', function(dt) {
  time += dt / 1000
  mat.uniforms.iGlobalTime.value = time
})

//texture is ready.. show box
function ready() {
  box.visible = true
}