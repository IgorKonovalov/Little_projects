const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

cx.lineWidth = 2

function drawCircle(centerX, centerY, radius, color) {
  cx.beginPath()
  cx.strokeStyle = color
  cx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  cx.stroke()
}

function getPointsByCirle(radiusBig, radiusSmall, centerX, centerY) {
  const radius = radiusBig - radiusSmall
  let pointsArray = []
  let x, y
  for (let i = 0; i < 360; i++) {
    let degreeRad = i  * Math.PI / 180
    x = centerX + radius * Math.cos(degreeRad)
    y = centerX + radius * Math.sin(degreeRad)
    pointsArray.push({x: x, y: y})
  }
  return pointsArray;
}

const centerX = canvas.width/2
const centerY = canvas.height/2
const radiusOne = 320
const radiusTwo = 120
const radiusThree = 40

drawCircle(centerX, centerY, radiusOne, 'white')
const pointsArr = getPointsByCirle(radiusOne, radiusTwo, centerX, centerY)
let i = 0
setInterval(() => {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  drawCircle(centerX, centerY, radiusOne, 'white')
  drawCircle(pointsArr[i].x, pointsArr[i].y, radiusTwo, 'white')
  i++
  if (i === 360) {
    i = 0
  }
}, 10)
