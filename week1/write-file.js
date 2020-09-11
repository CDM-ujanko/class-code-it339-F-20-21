'use strict'

const fs = require('fs');
const fileName = process.argv[2];
const content = process.argv[3];

if (!fileName) {
  throw Error('A file name must be provided!');
}

if (!content) {
  throw Error('You have to give me content!');
}

fs.writeFile(fileName, content, (err) => {
  if (err) throw err
});