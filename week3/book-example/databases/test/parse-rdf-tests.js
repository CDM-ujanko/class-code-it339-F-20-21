'use strict'

const fs = require('fs'),
    expect = require('chai').expect;

const rdf = fs.readFileSync('../data/cache/epub/132/pg132.rdf');
const parseRDF = require('../lib/parse-rdf');

describe('ParseRDF', () => {
  it('Should be a function', () => {
    expect(parseRDF).to.be.a('function');
  })

  it('Should parse RDF', () => {
    const book = parseRDF(rdf);

    expect(book).to.be.an('object');
    expect(book).to.have.a.property('id', 132);
    expect(book).to.have.a.property('title', 'The Art of War');

    expect(book).to.have.a.property('authors')
        .that.is.an('array').with.lengthOf(2)
        .and.contains('Giles, Lionel')
        .and.contains('Sunzi, active 6th century B.C.');

    expect(book).to.have.a.property('subjects')
        .that.is.an('array').with.lengthOf(2)
        .and.contains('War -- Early works to 1800')
        .and.contains('Military art and science -- Early works to 1800');
  });
});
