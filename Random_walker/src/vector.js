const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  x = this.x + other.x;
  y = this.y + other.y;
  return new Vector(x, y);
}

Vector.prototype.multiply = function(factor) {
  x = this.x * factor;
  y = this.y * factor;
  return new Vector(x, y)
}

let vector = new Vector(1,2);

console.log(vector.multiply(10));
