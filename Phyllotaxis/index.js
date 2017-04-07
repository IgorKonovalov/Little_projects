const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

function degreeToRad(degree) {
  const rad = degree / 180 * Math.PI
  return rad
}

function reMap(value, start1, stop1, start2, stop2) {
  const slope = (stop2 - start2) / (stop1 - start1)
  return start2 + slope * (value - start1)
}

const centerX = canvas.width / 2
const centerY = canvas.height / 2

let n = 0
let c = 10

cx.fillStyle = 'white'

function draw() {
  let angle = degreeToRad(n * 135.5);
  let rad = c * Math.sqrt(n);
  let x = rad * Math.cos(angle) + centerX;
  let y = rad * Math.sin(angle) + centerY;
  cx.beginPath();
  cx.arc(x, y, 5, 0, 2 * Math.PI);
  cx.fillStyle = `hsl(${n}, 100%, 50%)`
  cx.fill();
  n++;
}

setInterval(()=> {
  draw()
}, 10)
