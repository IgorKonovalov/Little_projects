function *fibonacci(a=0,b=1) {
  while (true) {
    yield a;
    [a,b] = [b,a+b]
  }
}

function *odd(f) {
  while (true) {
    let v = f.next().value
    if (v & 1) { yield v }
  }
}

function *cats() {
  while (true) {
    yield 'alice'
    yield 'bob'
    yield 'eve'
  }
}

function *transpose(f,g) {
  while (true) {
    yield [f.next().value, g.next().value]
  }
}

function *intersperse(a,f) {
  while (true) {
    yield a
    yield f.next().value
  }
}

function *get(n,f) {
  while(n--) {
    let v = f.next().value
    yield v
  }
}

console.log( "The first 10 odd fibonacci numbers:\n", [...get(10, odd(fibonacci()) )], "\n" )
console.log( "20 fibonacci numbers insterspersed with zeroes:\n", [...get(20, intersperse(0,fibonacci()) )], "\n" )
console.log( "My first two cats:\n", [...get(2, cats() )], "\n" )
console.log( "My three cats, transposed with the fibonacci sequence:\n", [...get(10, transpose(cats(),fibonacci()) )], "\n" );

let [x,y] = transpose(cats(),fibonacci())
console.log( "Or using decomposition:\n", [y,x])
