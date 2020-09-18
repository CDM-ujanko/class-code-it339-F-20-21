'use strict'

const net = require('net'),
      fs = require('fs'),
      fileName = process.argv[2],
      port = process.argv[3];


if (!fileName) {
  throw Error('A file name must be provided');
}

if (!port) {
  throw Error('A port must be provided');
}

net.createServer((con) => {
  console.log('A client connected!');
  con.write('Welcome to my nice little network program!\n');

  fs.watch(fileName, () => {
    console.log(`${fileName} changed!`);
    con.write(`${fileName} changed!`);
  })
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
