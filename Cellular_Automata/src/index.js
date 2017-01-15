const cx = document.querySelector("canvas").getContext("2d");
const scale = 5;
const rowCount = Math.floor(cx.canvas.height / scale);
const columnCount = Math.floor(cx.canvas.width / scale);
const color = "white";

console.log("columns: " + columnCount + " rows: " + rowCount);

// функции для задания начального состояния

function setRandomRow(row) {
  row.forEach(cell => {cell.status = Math.round(Math.random());});
}

function setOneCellRow(row) {
  let posX = Math.round(columnCount / 2);
  row[posX].status = 1;
}

function setFullRow(row) {
  row.forEach(cell => {cell.status = 1});
}

function setEmptyRow(row) {
  row.forEach(cell => {cell.status = 0});
}

function createEmptyRow(row) {
  row = [];
  for (let i = 0; i < columnCount; i++) {
    row[i] = {x: 0, y: 0, status: 0};
  }
}

let cells=[];
function createStart() {
  for (let row = 0; row < rowCount; row++) {
    cells[row] = [];
    for (let column = 0; column < columnCount; column++) {
      cells[row][column] = {x: 0, y: 0, status: 0};
    }
  }
}

createStart();
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


function setNextRowByRule(rule, prevRow, nextRow) {
  let length = prevRow.length;
  nextRow.forEach((cell, index) => {
    let target = cell;
    let leftSibling = prevRow[index - 1] || prevRow[length - 1];
    let prevSelf = prevRow[index];
    let rightSibling = prevRow[index + 1] || prevRow[0];
    let toggleClass = setActiveIfMatchesRule.bind(null, target, leftSibling, prevSelf, rightSibling);
    for (let i = 0; i < 8; i++) {
      toggleClass(rule.ruleMap[i], rule.ruleValue[i]);
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

function clearCanvas() {
  cx.beginPath();
  cx.rect(0, 0, cx.canvas.width, cx.canvas.height);
  cx.fillStyle="black";
  cx.fill();
}

// Управление

const selectFirstRow = document.getElementById('selectFirstRow');
let firstRowState = 'Random';
selectFirstRow.addEventListener('change', function () {
  if (selectFirstRow.value == 'Random') firstRowState = 'Random'
  else if (selectFirstRow.value == 'One') firstRowState = 'One'
  else if (selectFirstRow.value == 'Full') firstRowState = 'Full'
  else if (selectFirstRow.value == 'None') firstRowState = 'None'
})
let optionRow1 = document.createElement('option');
optionRow1.innerHTML = 'Random';
selectFirstRow.appendChild(optionRow1);
let optionRow2 = document.createElement('option');
optionRow2.innerHTML = 'One';
selectFirstRow.appendChild(optionRow2);
let optionRow3 = document.createElement('option');
optionRow3.innerHTML = 'Full';
selectFirstRow.appendChild(optionRow3);
let optionRow4 = document.createElement('option');
optionRow4.innerHTML = 'None';
selectFirstRow.appendChild(optionRow4);





const selectRule = document.getElementById('selectRule');
selectRule.addEventListener('change', function () {
  for (let item in RULES) {
    if (RULES[item].rule == selectRule.value) {
      updateCanvas(item, firstRowState);
    }
  }
})
for (let item in RULES) {
  let option = document.createElement('option');
  option.innerHTML = RULES[item].rule;
  selectRule.appendChild(option);
}



const startB = document.getElementById('startPause');
const pauseB = document.getElementById('clear');




// проверки
// setRandomRow(cells[0]);
//setOneCellRow(cells[0]);
//setFullRow(cells[2]);
//copyRow(cells[0], cells[3]);



// update canvas function
function updateCanvas(ruleNumber, first) {
  createStart();
  clearCanvas();
  if (first == 'Random') {
    setRandomRow(cells[0]);
  } else if (first == 'One') {
    setOneCellRow(cells[0]);
  } else if (first == 'Full') {
    setFullRow(cells[0]);
  } else if (first == 'None'){
    setEmptyRow(cells[0]);
  }
  let count = 0;
  let update = setInterval(function() {
    setNextRowByRule(RULES[ruleNumber], cells[count], cells[count+1]);
    drawAllRows(cells);
    count++;
    if (count == rowCount - 1) {
      clearInterval(update);
    }
  }, 50);
}

//updateCanvas(0, setRandomRow(cells[0]));
