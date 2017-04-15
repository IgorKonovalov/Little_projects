const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

cx.lineWidth = 5

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
  cx.setTransform(1, 0, 0, 1, centerX, centerY);
  cx.beginPath();
  cx.strokeStyle = circle.color;
  cx.arc(0, 0, circle.radius, 0, 2 * Math.PI, false);
  cx.stroke();
}

const centerX = canvas.width/2
const centerY = canvas.height/2
const radiusBig = 320
const radiusMiddle = 120
const radiusSmall = 40

const bigCircle = new Circle(320, 120, 'white')
const middleCircle = new Circle(120, 40, 'white')
const smallCircle = new Circle(40, 10, 'white')
const smallerCircle = new Circle(10, 2, 'lightBlue')


const points = bigCircle.getPointsByCirle();
const middlePoints = middleCircle.getPointsByCirle();
const smallPoints = smallCircle.getPointsByCirle();

let i = 0
let j = 359
let z = 359

const drawing = setInterval(() => {
  cx.setTransform(1, 0, 0, 1, 0, 0);
  cx.clearRect(0, 0, canvas.width, canvas.height);
  draw(bigCircle, centerX, centerY)
  draw(middleCircle, points[i].x + centerX, points[i].y + centerY)
  draw(smallCircle, middlePoints[j].x + points[i].x + centerX, middlePoints[j].y + points[i].y + centerY)
  draw(smallerCircle, smallPoints[i].x + middlePoints[j].x + points[i].x + centerX, smallPoints[i].y + middlePoints[j].y + points[i].y + centerY)
  i ++;
  j --;
  z --;
  if (i > 359) {i = 0}
  if (j == 0) {j = 359}
  if (z == 0) {z = 359}
}, 10)
