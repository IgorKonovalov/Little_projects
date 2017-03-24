const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

const xStart = canvas.width/2
const yStart = canvas.height/2

let n = 7
let d = 4
let k = n/d

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
  for (let a = 0; a < 360 * Math.ceil(d); a += .125) {
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
  let prev = point
  cx.beginPath()
  cx.fillRect(point.x, point.y, 10, 10)
  cx.fillStyle = `hsl(${index}, 70%, 50%)`
  cx.fill()
}

drawPath = (index) => {
  if (pathCounter < 1000) {
    path.push(index)
  } else {
    path.shift()
    path.push(index)
  }
  for (let i = 0; i < pathCounter; i++) {
    let index = path[i]
    cx.beginPath()
    cx.strokeStyle = `hsl(${index}, 70%, 50%)`
    cx.lineWidth = 10
    cx.lineTo(points[index].x, points[index].y)
    cx.stroke()
  }
  pathCounter++
}

setInterval(() => {
  drawRose(k)
  // drawPoint(points[i], i)
  drawPath(i)
  i++
  if (i === 2878 * d) {
    i = 0
  }
}, 10)
