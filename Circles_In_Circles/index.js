const canvas = document.getElementById('canvas')
const cx = canvas.getContext('2d')

const centerX = canvas.width/2
const centerY = canvas.height/2
const radius = 320

cx.beginPath()
cx.strokeStyle = 'white'
cx.lineWidth = 2
cx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
cx.stroke()
