const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

const xStart = canvas.width/2
const yStart = canvas.height/2

const n = 3
const d = 1
const k = n/d

let points = []

drawRose = k => {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  cx.beginPath()
  cx.strokeStyle = 'white'
  cx.lineCap = 'round'
  cx.lineWidth = .3
  for (let a = 0; a < 360 * Math.ceil(d); a += 1) {
    deg = a * Math.PI / 180
    r = Math.sin(- k * deg) * (xStart - 20)
    x = xStart + r * Math.cos(deg)
    y = xStart + r * Math.sin(deg)
    cx.lineTo(x, y)
  }
  cx.stroke()
}

getPoints = k => {
  for (let a = 0; a < 360 * Math.ceil(d); a += .5) {
    deg = a * Math.PI / 180
    r = Math.sin(- k * deg) * (xStart - 20)
    x = xStart + r * Math.cos(deg)
    y = xStart + r * Math.sin(deg)
    points.push({x: x, y: y})
  }
}

drawRose(k)
getPoints(k)


let i = 0
let pathCounter = 0
let path = []

drawPoint = (point, index) => {
  cx.beginPath()
  cx.fillRect(point.x, point.y, 10, 10)
  cx.fillStyle = `hsl(${index}, 70%, 50%)`
  cx.fill()
}

drawPath = (index) => {
  if (pathCounter < 200) {
    path.push(index)
  } else {
    path.shift()
    path.push(index)
  }
  for (let j = 0; j < pathCounter - 1; j++) {
    cx.beginPath()
    let indexP = path[j]
    if (!indexP) {
      indexP = index
    }
    cx.strokeStyle = `hsl(${indexP}, 70%, 50%)`
    cx.lineWidth = 10
    if (indexP >= 1) {
      cx.moveTo(points[indexP - 1].x, points[indexP - 1].y)
    }
    cx.lineTo(points[indexP].x, points[indexP].y)
    cx.stroke()
  }
  pathCounter++
}

setInterval(() => {
  drawRose(k)
  // drawPoint(points[i], i)
  drawPath(i)
  i++
  if (i === 361 * d) {
    i = 0
  }
}, 30)
