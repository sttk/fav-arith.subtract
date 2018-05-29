'use strict';

var gcd = require('@fav/math.gcd');
var ArithNumber = require('@fav/arith.number');
var reduce = require('@fav/arith.reduce');

function subtract(arithNum1, arithNum2) {
  var n1 = arithNum1.numerator;
  var d1 = arithNum1.denominator;
  var e1 = arithNum1.exponent;

  var n2 = arithNum2.numerator;
  var d2 = arithNum2.denominator;
  var e2 = arithNum2.exponent;

  var g = gcd(d1, d2);

  var r1 = d1 / g;
  if (!ArithNumber.isSafeDenominator((d1 = r1 * d2)) ||
      !ArithNumber.isSafeNumerator((n1 *= d2 / g)) ||
      !ArithNumber.isSafeNumerator((n2 *= r1))) {
    return;
  }

  if (e1 > e2) {
    n1 *= Math.pow(10, e1 - e2);
    e1 = e2;
  } else {
    n2 *= Math.pow(10, e2 - e1);
  }

  var a = new ArithNumber(n1 - n2, d1, e1);
  if (a.numerator === a.numerator) {
    return a;
  }
}

function subtractConsideringLargeNumbers(arithNum1, arithNum2) {
  return subtract(arithNum1, arithNum2) ||
         subtract(reduce(arithNum1), reduce(arithNum2)) ||
         new ArithNumber(NaN, NaN, NaN);
}

ArithNumber.prototype.subtract = function(num) {
  if (num instanceof ArithNumber) {
    return subtractConsideringLargeNumbers(this, num);
  } else {
    return subtractConsideringLargeNumbers(this, ArithNumber.of(num));
  }
};

module.exports = subtractConsideringLargeNumbers;
