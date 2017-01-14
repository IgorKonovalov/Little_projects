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

let ruleMap = [
  [1,1,1],
  [1,1,0],
  [1,0,1],
  [1,0,0],
  [0,1,1],
  [0,1,0],
  [0,0,1],
  [0,0,0]
]

let ruleValue = [
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true
]


function setNextRowByRule(prevRow, nextRow) {
  let length = prevRow.length;
  nextRow.forEach((cell, index) => {
    let target = cell;
    let leftSibling = prevRow[index - 1] || prevRow[length - 1];
    let prevSelf = prevRow[index];
    let rightSibling = prevRow[index + 1] || prevRow[0];
    let toggleClass = setActiveIfMatchesRule.bind(null, target, leftSibling, prevSelf, rightSibling);
    for (let i = 0; i < 8; i++) {
      toggleClass(ruleMap[i], ruleValue[i]);
    }
  })
}

function setActiveIfMatchesRule(
  target,
  leftSibling,
  prevSelf,
  rightSibling,
  rule,
  ruleValue
) {
  let matchesRule =
    leftSibling.status == rule[0] &&
    prevSelf.status == rule[1] &&
    rightSibling.status === rule[2]
  if(matchesRule)
    setIsActive(target, ruleValue)
}

function setIsActive(target, value) {
  if (value) {
    target.status = 1;
  } else {
    target.status = 0;
  }
}
// проверки
setRandomRow(cells[0]);
//setOneCellRow(cells[1]);
//setFullRow(cells[2]);
//copyRow(cells[0], cells[3]);
setNextRowByRule(cells[0], cells[1]);
setNextRowByRule(cells[1], cells[2]);
setNextRowByRule(cells[2], cells[3]);
setNextRowByRule(cells[3], cells[4]);


drawAllRows(cells);



//setOneCellRow(cells[1]);
