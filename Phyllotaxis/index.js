const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

function degreeToRad(degree) {
  return degree / 180 * Math.PI
}

function reMap(value, start1, stop1, start2, stop2) {
  const slope = (stop2 - start2) / (stop1 - start1)
  return start2 + slope * (value - start1)
}

console.log(reMap(1, -1, 1, 0, 360));

const width = canvas.width / 2
const height = canvas.height / 2

const n = 0
const c = 3

let points = []
let start = 0

function draw() {
  cx.translate(width / 2, height / 2)
  cx.rotate(degreeToRad(n * 0.3))
  for (let i = 0; i < n; i++) {
    let a = i * 137.5
    let r = c * Math.sqrt(i)
    let x = r * Math.cos(a)
    let y = r * Math.sin(a)
    let hu = Math.sin(start + i * 0.5)
    hu = map(hu, -1, 1, 0, 360)
    fill(hu, 255, 255)
    cx.ellipse(x, y, 4, 4)
  }
  n += 5
  start += 5
}
