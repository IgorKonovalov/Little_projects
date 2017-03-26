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

// console.log( "The first 10 odd fibonacci numbers:\n", [...get(10, odd(fibonacci()) )], "\n" )
// console.log( "20 fibonacci numbers insterspersed with zeroes:\n", [...get(20, intersperse(0,fibonacci()) )], "\n" )
// console.log( "My first two cats:\n", [...get(2, cats() )], "\n" )
// console.log( "My three cats, transposed with the fibonacci sequence:\n", [...get(10, transpose(cats(),fibonacci()) )], "\n" );
//
// let [x,y] = transpose(cats(),fibonacci())
// console.log( "Or using decomposition:\n", [y,x])

function *stupidNumbers() {
  let foo1 = yield 1
  // console.log(foo1)
  let foo2 = yield 2
  // console.log(foo2)
  yield 3
  yield 4
  yield 5
}

// let it = stupidNumbers()
// console.log(it.next())
// console.log(it.next('foo1'))
// console.log(it.next('hey'))
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// for (v of stupidNumbers()) { // cannot pass values here
//   console.log(v)
// }


function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}

// let it = foo( 5 )

// note: not sending anything into `next()` here
// console.log( it.next() )     // { value:6, done:false }
// console.log( it.next( 12 ) )   // { value:8, done:false }
// console.log( it.next( 13 ) )   // { value:42, done:true }

// ERROR HANDLING

function *catchError() {
  try {
    let x = yield 3;
    console.log( "x: " + x ) // may never get here!
  }
  catch (err) {
    console.log( "Error: " + err )
  }
}

var it = catchError()

var res = it.next() // { value:3, done:false }
// it.next(2)
// instead of resuming normally with another `next(..)` call,
// let's throw a wrench (an error) into the gears:
it.throw( "Oops!" ) // Error: Oops!
