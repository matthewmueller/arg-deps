/**
 * Module Dependencies
 */

var parse = require('parse-fn-args');
var fnbody = require('fn-body');

/**
 * Regexp
 */

var regexp = /(?:^|\+|\-|\*|\.|\\|\,|\:|\%|\||\!|\?|\#|\&|\;|\,|\(|\)|\<|\>|\}|\=)?\s*([a-zA-Z_$][0-9a-zA-Z_$]*)(?:(?:\.|\[['"])([a-zA-Z_$][0-9a-zA-Z_$]*)|\[([0-9]+))/g;

/**
 * Export `deps`
 */

module.exports = deps;

/**
 * Get the properties of the
 * arguments passed into `fn`.
 *
 * @param {Function}
 * @return {Object}
 * @api public
 */

function deps(fn) {
  var body = fnbody(fn);
  var args = parse(fn);
  var out = {};
  var m;

  args.forEach(function(arg) {
    out[arg] = [];
  })

  while (m = regexp.exec(body)) {
    out[m[1]] && out[m[1]].push(m[2] || +m[3]);
  }

  // ensure all arguments are unique
  for (var k in out) {
    out[k] = unique(out[k]);
  }

  return out;
}

/**
 * Unique-ify using a hash seive
 *
 * @param {Array} arr
 * @return {Array}
 */

function unique(arr) {
  var o = {}, i, l = arr.length, r = [];
  for(i=0; i<l;i+=1) o[arr[i]] = arr[i];
  for(i in o) r.push(o[i]);
  return r;
}
