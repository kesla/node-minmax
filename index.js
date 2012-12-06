var assert = require('assert');

var MinMax = module.exports = function(opts) {
    opts = opts || {};

    function minmax(val) {
        if (Array.isArray(val)) {
            val.forEach(function(v) { minmax(v); });
        };
        if (minmax.min === null || val < minmax.min) {
            minmax.min = val;
        }
        if (!minmax.max === null || val > minmax.max) {
            minmax.max = val;
        }
    }
    minmax.min = opts.min === undefined? null : opts.min;
    minmax.max = opts.max === undefined? null : opts.max;
    minmax.__defineGetter__('diff', function() {
        return minmax.max - minmax.min;
    });
    return minmax;
}

var minmax = MinMax();
minmax(4711);
assert.strictEqual(minmax.min, 4711);
assert.strictEqual(minmax.max, 4711);
assert.strictEqual(minmax.diff, 0);

minmax = MinMax({ max: 0 });
minmax(-4711);
assert.strictEqual(minmax.max, 0);
assert.strictEqual(minmax.min, -4711);
assert.strictEqual(minmax.diff,4711);

minmax = MinMax({ min: 0 });
minmax(4711);
assert.strictEqual(minmax.max, 4711);
assert.strictEqual(minmax.min, 0);
assert.strictEqual(minmax.diff, 4711);

minmax = MinMax();
minmax(new Date(0));
minmax([new Date(-1000000), [new Date(1000000)]]);
assert(minmax.max instanceof Date);
assert(minmax.min instanceof Date);
assert.strictEqual(minmax.min.getTime(), -1000000);
assert.strictEqual(minmax.max.getTime(), 1000000);
assert.strictEqual(minmax.diff, 2000000);

minmax = MinMax();
minmax([200, [-100]]);
assert.strictEqual(minmax.max, 200);
assert.strictEqual(minmax.min, -100);
assert.strictEqual(minmax.diff, 300);
