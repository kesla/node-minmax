node-minmax[![build status](https://secure.travis-ci.org/kesla/node-minmax.png)](http://travis-ci.org/kesla/node-minmax)
===========

Calculate the minimum, maximum value and more.

## Example
```javascript
    var mm = minmax();
    mm(0);
    mm(-4712);
    assert.strictEqual(mm.max, 0);
    assert.strictEqual(mm.min, -4712);
    assert.strictEqual(mm.diff, 4712);
    assert.strictEqual(mm.mean, -2356);
```
