const cx = document.querySelector("canvas").getContext("2d");
const scale = 5;
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);
const color = "#000000";

console.log("columns: " + columnCount + " rows: " + rowCount);

let cells = [];

for (let row = 0; row < rowCount; row++) {
  cells[row] = [];
  for (let column = 0; column < columnCount; column++) {
    cells[row][column] = {x: 0, y: 0, status: 0};
  }
}

function setRandomRow(row) {
  row.forEach(cell => {cell.status = Math.round(Math.random());});
}

function setOneCellRow(row) {
  let posX = Math.round(columnCount / 2);
  row[posX].status = 1;
}

function drawRow(index) {
  cells[index].forEach(function(cell, column) {
    cell.x = column * scale;
    cell.y = index * scale;
    if (cell.status == 1) {
      cx.beginPath();
      cx.rect(cell.x, cell.y, scale, scale);
      cx.fillStyle = color;
      cx.fill();
      cx.closePath();
    }
  });
}

// setRandomRow(cells[0]);
// drawRow(0);

setOneCellRow(cells[1]);
drawRow(1);
