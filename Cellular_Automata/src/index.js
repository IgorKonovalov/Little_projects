const cx = document.querySelector("canvas").getContext("2d");
const scale = 10;
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);
const color = "white";

console.log("columns: " + columnCount + " rows: " + rowCount);

let cells = [];

for (let row = 0; row < rowCount; row++) {
  cells[row] = [];
  for (let column = 0; column < columnCount; column++) {
    cells[row][column] = {x: 0, y: 0, status: 0};
  }
}

// функции для задания начального состояния

function setRandomRow(row) {
  row.forEach(cell => {cell.status = Math.round(Math.random());});
}

function setOneCellRow(row) {
  let posX = Math.round(columnCount / 2);
  row[posX].status = 1;
}

function setFullRow(row) {
  row.forEach(cell => {cell.status = 1;});
}
// рисование

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

function drawAllRows(cells) {
  cells.forEach((_, index) => {drawRow(index)});
}

function drawBorder() {
  cx.beginPath();
  cx.strokeStyle = "white";
  cx.lineWidth = 1;
  cx.rect(0, 0, cx.canvas.width, cx.canvas.height);
  cx.stroke();
}

// логика! :)

function copyRow(row1, row2) {
  row2.forEach((cell, index) => {
    cell.status = row1[index].status;
  })
}

function updateRowByRule(row1, row2) {
  
}

// проверки
setRandomRow(cells[0]);
setOneCellRow(cells[1]);
setFullRow(cells[2]);
copyRow(cells[0], cells[3]);
drawAllRows(cells);



//setOneCellRow(cells[1]);
