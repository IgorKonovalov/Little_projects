const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

cx.lineWidth = 2

function Circle(radius, radiusSmall, color) {
  this.radius = radius
  this.color = color
  this.radiusSmall = radiusSmall

  this.pointsArray = []

  this.getPointsByCirle = function() {
    const radiusInner = this.radius - this.radiusSmall
    let pointsArray = []
    let x, y
    for (let i = 0; i < 360; i ++) {
      let degreeRad = i  * Math.PI / 180
      x = radiusInner * Math.cos(degreeRad)
      y = radiusInner * Math.sin(degreeRad)
      pointsArray.push({x, y})
    }
    return this.pointsArray = pointsArray;
  }

}

function draw(circle, centerX, centerY) {
  cx.beginPath();
  cx.strokeStyle = circle.color;
  cx.translate(centerX, centerY);
  cx.arc(0, 0, circle.radius, 0, 2 * Math.PI, false);
  cx.stroke();
}

const centerX = canvas.width/2
const centerY = canvas.height/2
const radiusBig = 320
const radiusMiddle = 120
const radiusSmall = 40

let bigCircle = new Circle(320, 120, 'white')
let middleCircle = new Circle(120, 40, 'white')

draw(bigCircle, centerX, centerY)

const points = bigCircle.getPointsByCirle();
let i = 0

setInterval(() => {
  draw(middleCircle, points[i].x, points[i].y)
  i++
  cx.setTransform(1,0,0,1,centerX,centerY);
  if (i > 359) {
    i = 0
  }
}, 10)
