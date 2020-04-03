const Delta = require("quill-delta");
var richText = require('../lib/type').type;
var expect = require('chai').expect;

describe('presence', function() {
  it('transforms a zero-length range by an op before it', function() {
    const range = {index: 10, length: 0};
    const op = new Delta().insert('foo');
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 13, length: 0});
  });

  it('does not transform a zero-length range by an op after it', function() {
    const range = {index: 10, length: 0};
    const op = new Delta().retain(20).insert('foo');
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 10, length: 0});
  });

  it('transforms a range with length by an op before it', function() {
    const range = {index: 10, length: 3};
    const op = new Delta().insert('foo');
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 13, length: 3});
  });

  it('transforms a range with length by an op that deletes part of it', function() {
    const range = {index: 10, length: 3};
    const op = new Delta().retain(9).delete(3);
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 9, length: 1});
  });

  it('transforms a range with length by an op that deletes the whole range', function() {
    const range = {index: 10, length: 3};
    const op = new Delta().retain(9).delete(5);
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 9, length: 0});
  });

  it('keeps extra metadata when transforming', function() {
    const range = {index: 10, length: 0, meta: 'lorem ipsum'};
    const op = new Delta().insert('foo');
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 13, length: 0, meta: 'lorem ipsum'});
  });

  it('returns null when no presence is provided', function() {
    const op = new Delta().insert('foo');
    const transformed = richText.transformPresence(undefined, op);
    expect(transformed).to.be.null;
  });

  it('advances the cursor if inserting at own index', function() {
    const range = {index: 10, length: 2};
    const op = new Delta().retain(10).insert('foo');
    const transformed = richText.transformPresence(range, op, true);
    expect(transformed).to.eql({index: 13, length: 2});
  });

  it('does not advance the cursor if not own op', function () {
    const range = {index: 10, length: 2};
    const op = new Delta().retain(10).insert('foo');
    const transformed = richText.transformPresence(range, op, false);
    expect(transformed).to.eql({index: 10, length: 5});
  });

  it('accepts an array of ops rather than a Delta', function() {
    const range = {index: 10, length: 0};
    const op = [{insert: 'foo'}];
    const transformed = richText.transformPresence(range, op);
    expect(transformed).to.eql({index: 13, length: 0});
  });

  it('does nothing if no op is provided', function() {
    const range = {index: 10, length: 0};
    const transformed = richText.transformPresence(range, undefined);
    expect(transformed).to.eql({index: 10, length: 0});
  });

  it('does not mutate the original range', function() {
    const range = {index: 10, length: 0};
    const op = new Delta().insert('foo');
    richText.transformPresence(range, op);
    expect(range).to.eql({index: 10, length: 0});
  });
});
