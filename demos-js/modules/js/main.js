var mult = require('./mult').mult;
var ld = require('lodash');

import qunit from 'qunitjs';

//document.write(mult(2,3));
//document.write(ld.zip([1,2,3],['a','b','c']).toString());

qunit.test ('my first test', assert => {
  assert.equal(1,1);
});

qunit.test ('my second test', assert => {
  assert.equal(1,2);
});

qunit.start();
