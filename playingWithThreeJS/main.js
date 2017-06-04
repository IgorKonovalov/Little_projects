const ww = window.innerWidth, wh = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas')
})
renderer.setSize(ww, wh)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000)
camera.position.z = 400

const points = [
  [68.5, 185.5],
  [1, 262.5],
  [270.9, 281.9],
  [345.5, 212.8],
  [178, 155.7],
  [240.3, 72.3],
  [153.4, 0.6],
  [52.6, 53.3],
  [68.5, 185.5]
]

//Convert the array of points into vertices
for (let i = 0; i < points.length; i++) {
  let x = points[i][0]
  let y = Math.random() * 150
  let z = points[i][1]
  points[i] = new THREE.Vector3(x, y, z)
}

const path = new THREE.CatmullRomCurve3(points)
const colors = [0xff6138, 0xffff9d, 0xbeeb9f, 0x79bd8f, 0x00a388]
for (let i = 0; i < colors.length; i++) {
  let geometry = new THREE.TubeBufferGeometry(path, 100, i * 2 + 4, 10, true)
  let material = new THREE.MeshBasicMaterial({
    color: colors[i],
    transparent: true,
    wireframe: true,
    opacity: (1 - i / 5) * 0.5 + 0.1
  })
  let tube = new THREE.Mesh(geometry, material)
  scene.add(tube)
}


const light = new THREE.PointLight(0xffffff, 1, 50)
scene.add(light)

let percentage = 0
render = () => {
  percentage += 0.0003
  let p1 = path.getPointAt(percentage % 1)
  let p2 = path.getPointAt((percentage + 0.02) % 1)
  camera.position.set(p1.x, p1.y, p1.z)
  camera.lookAt(p2)
  light.position.set(p2.x, p2.y, p2.z)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

requestAnimationFrame(render)
