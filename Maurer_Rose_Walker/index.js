const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

const xStart = canvas.width/2
const yStart = canvas.height/2

let n = 3
let d = 1
let k = n/d

let points = []

drawRose = k => {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  cx.beginPath()
  cx.strokeStyle = 'white'
  cx.lineCap = 'round'
  cx.lineWidth = .3
  for (let a = 0; a < 360 * Math.ceil(d); a += .0625) {
    deg = a * Math.PI / 180
    r = Math.sin(- k * deg) * (xStart - 20)
    x = xStart + r * Math.cos(deg)
    y = xStart + r * Math.sin(deg)
    points.push({x: x, y: y})
    cx.lineTo(x, y)
  }
  cx.stroke()
}

drawRose(k)


let i = 0
let prev, next;

drawPoint = (point, index) => {
  let prev = point
  cx.beginPath()
  cx.fillRect(point.x, point.y, 10, 10)
  cx.fillStyle = `hsl(${index}, 70%, 50%)`
  cx.fill()
  i++
}

setInterval(() => {
  drawPoint(points[i], i)
  i++
  if (i === 5758) {
    i = 0
  }
}, 10)
