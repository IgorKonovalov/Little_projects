const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

cx.lineWidth = 2

function drawCircle(centerX, centerY, radius) {
  cx.beginPath()
  cx.strokeStyle = 'white'
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
  console.log(pointsArray);
}

const centerX = canvas.width/2
const centerY = canvas.height/2
const radius = 320

drawCircle(centerX, centerY, radius)

getPointsByCirle(radius, 30, centerX, centerY)
