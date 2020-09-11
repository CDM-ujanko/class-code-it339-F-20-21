'use strict'

const fs = require('fs');
const spawn = require('child_process').spawn;
const fileName = process.argv[2];

if (!fileName) {
  throw Error('A file name must be provided!');
}

fs.watch(fileName, () => {
  console.log(`${fileName} changed!`);
  const ls = spawn('ls', ['-la', fileName]);
  let output = '';

  ls.stdout.on('data', (chunk) => { output +=chunk });

  ls.on('close', () => {
    console.log(output.split('  '));
  });
})

console.log(`Watching ${fileName} for changes!`);
