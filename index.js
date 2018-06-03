'use strict';

var ArithNumber = require('@fav/arith.number');
var add = require('@fav/arith.add');

function subtract(a1, a2) {
  a2 = new ArithNumber(-a2.numerator, a2.denominator, a2.exponent);
  return add(a1, a2);
}

ArithNumber.prototype.subtract = function(num) {
  if (num instanceof ArithNumber) {
    return subtract(this, num);
  } else {
    return subtract(this, ArithNumber.of(num));
  }
};

module.exports = subtract;
