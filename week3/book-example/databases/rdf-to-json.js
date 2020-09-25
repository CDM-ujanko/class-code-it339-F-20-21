'use strict'

const fs = require('fs'),
    parseRDF = require('./lib/parse-rdf'),
    fileName = process.argv[2];

if (!fileName) {
  throw Error('A file name must be provided!');
}

// let book = parseRDF(fs.readFileSync(fileName));
// console.log(JSON.stringify(book, null, '  '));

fs.readFile(fileName, (err, data) => {
  let book = parseRDF(data);
  console.log(JSON.stringify(book, null, '  '));
});





