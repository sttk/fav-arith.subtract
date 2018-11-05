'use strict';

var BenchmarkTester = require('benchmark-tester');
var assert = require('assert');
var ArithNumber = require('@fav/arith.number');

new BenchmarkTester()
  .addTest('@fav/arith.subtract', function(module, data) {
    return data[0].subtract(data[1]);
  })
  .setConverter('@fav/arith.subtract', function(data) {
    return [
      new ArithNumber(data[0][0], data[0][1], 0),
      new ArithNumber(data[1][0], data[1][1], 0),
    ];
  })
  .verifyTest('@fav/arith.subtract', function(test, subtract) {
    var a = test(subtract, [
      new ArithNumber(-12, 5, 0),
      new ArithNumber(-34, 6, 0),
    ]);
    assert.strictEqual(a.numerator, 98);
    assert.strictEqual(a.denominator, 30);
    assert.strictEqual(a.exponent, 0);
  })

  .addTest('fraction.js', function(module, data) {
    return data[0].sub(data[1]);
  })
  .configPackage('fraction.js', function(Fraction) {
    Fraction.REDUCE = false;
  })
  .setConverter('fraction.js', function(data, Fraction) {
    return [
      new Fraction(data[0][0], data[0][1]),
      new Fraction(data[1][0], data[1][1]),
    ];
  })
  .verifyTest('fraction.js', function(test, Fraction) {
    var f = test(Fraction, [
      new Fraction(-12, 5),
      new Fraction(-34, 6),
    ]);
    assert.strictEqual(f.s, 1);
    assert.strictEqual(f.n, 98);
    assert.strictEqual(f.d, 30);
  })

  .runTest('Zeros', [[0, 1], [0, 1]])
  .runTest('Integers', [[123, 1, 0], [456, 1, 0]])
  .runTest('Decimals', [[123, 1000, 0], [456, 10000]])
  .runTest('Fractions', [[123, 45], [678, 90]])
  .runTest('Fractions', [[12, 34567], [89, 12345]])
  .runTest('BigNumbers', [[9007199254740990, 30], [-9007199254740990, 18]])
  .print();
