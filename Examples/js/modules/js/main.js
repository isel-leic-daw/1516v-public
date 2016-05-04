import mult from './mult';
import _ from 'lodash';
import Q from 'qunitjs';

console.log(Q);

let delay = v => new Promise((f,r) => setTimeout(()=>{f(v);}, 2000));

Q.test ('start', assert => {  
  assert.equal(1,1);
});

Q.test ('promises', assert => {
  let done = assert.async();
  delay(42)
  .then(v => v+100)
  .then(v => {assert.equal(v, 142); done()});
});

Q.test ('lodash', assert => {
  let res = _.zip([1,2], ['a','b']);
  assert.deepEqual(res, [[1, 'a'], [2, 'b']])
});

Q.start();

