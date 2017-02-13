console.log('hello, lovely');
const canvas = document.getElementById('rose');
const cx = canvas.getContext('2d');


let r, x, y, fi, deg;

// роза (из https://en.wikipedia.org/wiki/Rose_(mathematics))
const inputN = document.getElementById('n');
const inputD = document.getElementById('d');
const inputMaurer = document.getElementById('maurer');

let n = 20;
let d = 2;
let k;


// соединяем лепестки (https://en.wikipedia.org/wiki/Maurer_rose)

let maurer = 71; // 0-360
const xStart = canvas.width/2;
const yStart = canvas.height/2;

cx.lineCap = 'round';

const button = document.getElementById('generate');
button.addEventListener('click', function() {
  n = inputN.value;
  d = inputD.value;
  maurer = inputMaurer.value;
  k = n / d;
  draw(n, d, maurer, k);
})

function draw(n, d, maurer, k) {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  // connecting rose on angle
  cx.beginPath();
  cx.strokeStyle = 'blue';
  for (let i = 0; i < 3600; i++) {
    fi = (maurer * i) * Math.PI / 180;
    r = Math.cos(k * fi) * (xStart - 20);
    x = xStart + r * Math.cos(fi);
    y = yStart + r * Math.sin(fi);
    cx.lineTo(x, y);
  }
  cx.stroke();

  // drawing rose
  cx.beginPath();
  cx.strokeStyle = 'red';
  for (let a = 0; a < 3600 * d; a++) {
    deg = a * Math.PI / 180;
    r = Math.cos(k * deg) * (xStart - 20);
    x = xStart + r * Math.cos(deg);
    y = xStart + r * Math.sin(deg);
    cx.lineTo(x, y);
  }
  cx.stroke();
}
