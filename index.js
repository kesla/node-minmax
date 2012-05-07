var assert = require('assert');
var MinMax = module.exports = function(opts) {
  opts = opts || {};

  function minmax(val) {
    if (Array.isArray(val)) {
      val.forEach(function(v) { minmax(v); });
    };
    if (val < minmax.min) {
      minmax.min = val;
    }
    if (val > minmax.max) {
      minmax.max = val;
    }
  }
  minmax.min = opts.min === undefined? Infinity : opts.min;
  minmax.max = opts.max === undefined? -Infinity : opts.max;
  return minmax;
}

var minmax = MinMax();
minmax(4711);
assert(minmax.min === 4711);
assert(minmax.max === 4711);

minmax = MinMax({ max: 0 });
minmax(-4711);
assert(minmax.max === 0);
assert(minmax.min === -4711);

minmax = MinMax({ min: 0 });
minmax(4711);
assert(minmax.max === 4711);
assert(minmax.min === 0)

minmax = MinMax();
minmax(new Date(0));
minmax([new Date(-1000000), [new Date(1000000)]]);
assert(minmax.max instanceof Date);
assert(minmax.min instanceof Date);
assert(minmax.min.getTime() === -1000000);
assert(minmax.max.getTime() === 1000000);
