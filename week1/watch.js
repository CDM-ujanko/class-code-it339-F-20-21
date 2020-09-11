'use strict'

const fs = require('fs');
const spawn = require('child_process').spawn;
const fileName = process.argv[2];

console.log(process.argv);

if (!fileName) {
  throw Error('A file name must be provided!');
}

fs.watch(fileName, () => {
  // let x = 3;
  // (() => {
  //   console.log(x);
  // })();
  console.log(`${fileName} changed!`);
  const ls = spawn('ls', ['-la', fileName]);
  ls.stdout.pipe(process.stdout);
})

//
// setTimeout(() => {
//   console.log('3 seconds passed!');
// }, 3000);

console.log('I started watching!');
