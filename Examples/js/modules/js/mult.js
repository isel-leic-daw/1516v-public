import add from './add';
module.exports = function multImpl(a, b){
  if(a < 0) throw new Error('Cannot handle negative numbers');
  var res = 0;
  for(var i = 0 ; i < a ; ++i){
    res = add(res, b);
  }
  return res;
}