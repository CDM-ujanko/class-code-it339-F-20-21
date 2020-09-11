'use strict'

const fs = require('fs');
const fileName = process.argv[2];

if (!fileName) {
  throw Error('A file name must be provided!');
}

fs.readFile(fileName, (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data.toString());
})
