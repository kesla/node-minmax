var assert = require('assert');
var mean = require('running-mean');

var minmax = module.exports = function() {
    var r = mean();
    function minmax(val) {
        if (Array.isArray(val)) {
            return val.forEach(function(v) { minmax(v); });
        };
        r.push(val);
        minmax.mean = r.mean;
        if (minmax.min === null || val < minmax.min) {
            minmax.min = val;
            minmax.diff = minmax.max - minmax.min;
        }
        if (minmax.max === null || val > minmax.max) {
            minmax.max = val;
            minmax.diff = minmax.max - minmax.min;
        }
    }
    minmax.min = null;
    minmax.max = null;
    minmax.diff = null;
    return minmax;
}

var mm = minmax();
mm(4711);
assert.strictEqual(mm.min, 4711);
assert.strictEqual(mm.max, 4711);
assert.strictEqual(mm.diff, 0);
assert.strictEqual(mm.mean, 4711);

mm = minmax();
mm(0);
mm(-4712);
assert.strictEqual(mm.max, 0);
assert.strictEqual(mm.min, -4712);
assert.strictEqual(mm.diff, 4712);
assert.strictEqual(mm.mean, -2356);

mm = minmax();
mm(new Date(0));
mm([new Date(-1000000), [new Date(1000000)]]);
assert(mm.max instanceof Date);
assert(mm.min instanceof Date);
assert.strictEqual(mm.min.getTime(), -1000000);
assert.strictEqual(mm.max.getTime(), 1000000);
assert.strictEqual(mm.diff, 2000000);

mm = minmax();
mm([200, [-100]]);
assert.strictEqual(mm.max, 200);
assert.strictEqual(mm.min, -100);
assert.strictEqual(mm.diff, 300);
