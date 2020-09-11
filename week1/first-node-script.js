'use strict'

const pi = 3.14;

let y = 3.7
console.log('Hello world!');
console.log(y);
console.log(pi);

// Var vs let
// console.log(seven);
// console.log(x);

// BAD!
// pi = 17;

function foo() {
  let m = 12345;
  console.log('Foo got called!', m);
  console.log('foo this', this);
  m += m;
  console.log(m);
}

console.log('global this', this);

let x = foo;
x();
x();
x();


var seven = 7;
seven = 8;
console.log('seven', seven);


for (var i = 0; i < 10; i++) {
}
console.log(i);

for (let j = 0; j < 10; j++) {
}
// Won't work, block scope!
// console.log(j);

let boo = (() => {
  console.log('Boo called!');
})

boo();

