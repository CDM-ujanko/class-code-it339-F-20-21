'use strict'
const Queue = require('../Queue');
const assert = require('assert');

describe('Queue testing', function () {
  let q = new Queue();

  it('Should be empty', function () {
    assert.equal(q.isEmpty(), true);
  })

  it('Should have no items', function () {
    assert.equal(q.items.length, 0);
  })

  it('Items should be the same as empty array', function () {
    assert.deepEqual(q.items, []);
  })

  it('Should be empty', function () {
    q.enqueue('1');
    assert.equal(q.isEmpty(), false);
  })
});