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

Vector.prototype.random = function(length) {
  x = randomNumber(-length, length);
  y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2)) * randomSign();
  return new Vector(x, y);
}

function randomNumber(min, max) {
  if (min > 0)
    return (max - min) * Math.random();
  else
    return (max - min) * Math.random() + min;
}

function randomSign() {
  let test = Math.round(Math.random() * 2);
  if (test == 1)
    return -1;
  else
    return 1;
}

let test = new Vector;
console.log(test.random(1));

let vector = new Vector(1,2);

console.log(vector.multiply(10));
