node-minmax
===========

Calculate the minimum and maximum value.

## Example
```javascript
  var r = minmax();
  r(100);
  assert(r.min === 100);
  assert(r.max === 100);
  assert(r.diff === 0);

  r([200, [-100]]);
  assert(r.max === 200);
  assert(r.min === -100);
  assert(r.diff === 300);

  r = minmax({ min: 0}); // or max
  r(100);
  assert(r.min === 0);
  assert(r.max === 100);
  r(-100);
  assert(t.min === -100);
```
