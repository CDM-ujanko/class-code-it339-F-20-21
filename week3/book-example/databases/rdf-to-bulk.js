'use strict'

const dir = require('node-dir'),
    parseRDF = require('./lib/parse-rdf'),
    dirName = process.argv[2];

if (!dirName) {
  throw Error('A dirname name must be provided!');
}

let options = {
  match: /\.rdf$/,
  exclude: ['pg0.rdf']
}

dir.readFiles(dirName, options, (err, content, next) => {
  if (err) {
    throw err
  }

  let book = parseRDF(content);
  console.log(JSON.stringify({ index: { _id: `pg${book.id}` } }))
  console.log(JSON.stringify(book))
  next();
});
