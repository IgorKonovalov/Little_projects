const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

cx.lineWidth = 2

function Circle(centerX, centerY, radius, radiusSmall, color) {
  this.centerX = centerX
  this.centerY = centerY
  this.radius = radius
  this.color = color
  this.radiusSmall = radiusSmall

  this.pointsArray = []

  this.draw = function() {
    cx.beginPath()
    cx.strokeStyle = this.color
    cx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    cx.stroke()
  }


  this.getPointsByCirle = function() {
    const radiusInner = this.radius - this.radiusSmall
    let pointsArray = []
    let x, y
    for (let i = 0; i < 360; i++) {
      let degreeRad = i  * Math.PI / 180
      x = centerX + radiusInner * Math.cos(degreeRad)
      y = centerX + radiusInner * Math.sin(degreeRad)
      pointsArray.push({x: x, y: y})
    }
    return this.pointsArray = pointsArray;
  }

}


const centerX = canvas.width/2
const centerY = canvas.height/2
const radiusBig = 320
const radiusMiddle = 120
const radiusSmall = 40

let bigCircle = new Circle(centerX, centerY, 320, 120, 'white')

bigCircle.draw()
let pointsArr = bigCircle.getPointsByCirle();

let i = 0

setInterval(() => {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  bigCircle.draw()
  let mediumCircle = new Circle(pointsArr[i].x, pointsArr[i].y, 120, 40, 'white')
  mediumCircle.draw()
  i++
  if (i === 360) {
    i = 0
  }
}, 10)
