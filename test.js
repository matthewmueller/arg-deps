/**
 * Module Dependencies
 */

var Uglify = require('uglify-js');
var assert = require('assert');
var deps = require('./');

/**
 * Tests
 */

describe('arg-deps', function() {

  it('should support simple arrays', function() {
    var out = deps(function(o) { o[13] });
    assert.equal(13, out.o[0]);
  });

  it('should support objects', function() {
    var out = deps(function(o) { o.hi });
    assert.equal('hi', out.o[0]);
  });

  it('should support expressions', function() {
    var out = deps(function(o) { o.hi + o.hai });
    assert.equal('hi', out.o[0]);
    assert.equal('hai', out.o[1]);
  })

  it('should work within another scope', function() {
    var out = deps(function(o) { function another() { o.hi + o.hai; } });
    assert.equal('hi', out.o[0]);
    assert.equal('hai', out.o[1]);
  })

  it('should support multiple arguments', function() {
    var out = deps(function(o, a) { function another() { o.hi + o.hai + a.ok + a.okay; } });
    assert.equal('hi', out.o[0]);
    assert.equal('hai', out.o[1]);
    assert.equal('ok', out.a[0]);
    assert.equal('okay', out.a[1]);
  })

  it('should work with uglify', function() {
    var fn = function hi(o, a) { function another() { o.hi + o.hai + a.ok + a.okay; } another(); }
    var js = Uglify.minify(fn.toString(), { fromString: true }).code;
    var out = deps(js);
    assert.equal('hi', out.i[0]);
    assert.equal('hai', out.i[1]);
    assert.equal('ok', out.n[0]);
    assert.equal('okay', out.n[1]);
  })

  it('should uniquify arguments', function() {
    var out = deps(function(o, a) { function another() { o.hi + o.hi + a.ok + a.ok; } });
    assert.equal('hi', out.o[0]);
    assert.equal('ok', out.a[0]);
    assert(1 == out.o.length);
    assert(1 == out.a.length);
  })
});
