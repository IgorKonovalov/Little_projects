let test_elements = document.getElementsByClassName("test");
let test = test_elements[0];

for (var i = 0; i < 3; i++) {
  let clock = document.createElement("div");
  clock.className = "clock";
  test.appendChild(clock);
}

for (var i = 0; i < 3; i++) {
  let clock = document.createElement("div");
  clock.className = "clock_normal";
  test.appendChild(clock);
}



let clocks = document.getElementsByClassName("clock");
let clocks_normal = document.getElementsByClassName("clock_normal");

function update() {
  var time = new Date();
  
  clocks_normal[0].innerHTML = time.getHours();
  clocks_normal[1].innerHTML = time.getMinutes();
  clocks_normal[2].innerHTML = time.getSeconds();

  clocks[0].innerHTML = time.getHours().toString(2);
  clocks[1].innerHTML = time.getMinutes().toString(2);
  clocks[2].innerHTML = time.getSeconds().toString(2);
}

function clockStart() {
  setInterval(update, 1000);
  update;
}

clockStart();

// var myVar = setInterval(myTimer, 1000);
//
// function myTimer() {
//     var d = new Date();
//     document.getElementById("demo").innerHTML = d.toLocaleTimeString();
// }
