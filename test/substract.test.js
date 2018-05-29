'use strict';

var chai = require('chai');
var expect = chai.expect;

var fav = {}; fav.arith = {}; fav.arith.subtract = require('..');
fav.arith.number = require('@fav/arith.number');

var ArithNumber = fav.arith.number;
var subtract = fav.arith.subtract;

describe('fav.arith.subtract', function() {

  describe('Subtract zeros', function() {
    it('Should return zero ArithNumber object (1)', function() {
      var a1 = new ArithNumber(0, 1, 0);
      var a2 = new ArithNumber(0, 1, 0);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(0);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(0);
      expect(a3.toApproximateString()).to.equal('0');
    });

    it('Should return zero ArithNumber object (2)', function() {
      var a1 = new ArithNumber(0, 1, 100);
      var a2 = new ArithNumber(0, 1000, 0);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(0);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(0);
      expect(a3.toApproximateString()).to.equal('0');
    });
  });

  describe('Subtract integers with same exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(1, 1, 2);
      var a2 = new ArithNumber(1, 1, 2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(0);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(0);
      expect(a3.toApproximateString()).to.equal('0');
    });

    it('Should return accurate difference of two numbers (2)', function() {
      var a1 = new ArithNumber(123, 1, 2);
      var a2 = new ArithNumber(456, 1, 2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-333);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(2);
      expect(a3.toApproximateString()).to.equal('-33300');
    });

    it('Should return accurate difference of two numbers (3)', function() {
      var a1 = ArithNumber.of(-12);
      var a2 = ArithNumber.of('45');
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-57);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(0);
      expect(a3.toApproximateString()).to.equal('-57');
    });
  });

  describe('Subtract integers with different exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(123, 1, 1);
      var a2 = new ArithNumber(456, 1, 2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-4437);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(1);
      expect(a3.toApproximateString()).to.equal('-44370');
    });

    it('Should return accurate difference of two numbers (2)', function() {
      var a1 = new ArithNumber(1, 1, 1);
      var a2 = new ArithNumber(4, 1, -2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(996);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(-2);
      expect(a3.toApproximateString()).to.equal('9.96');
    });

    it('Should return accurate difference of two numbers (3)', function() {
      var a1 = new ArithNumber(0, 1, 100);
      var a2 = new ArithNumber(4, 1, -2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-4);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(-2);
      expect(a3.toApproximateString()).to.equal('-0.04');
    });
  });

  describe('Subtract positive exponentials with same denominators and ' +
  'exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = ArithNumber.of('10e+4');
      var a2 = ArithNumber.of('234e+2');
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(766);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(2);
      expect(a3.toApproximateString()).to.equal('76600');
    });
  });

  describe('Subtract negative exponentials with same denominators and ' +
  'exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = ArithNumber.of('10e-4');
      var a2 = ArithNumber.of('234e-2');
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-2339);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(-3);
      expect(a3.toApproximateString()).to.equal('-2.339');
    });
  });

  describe('Subtract fractions with same denominators and exponents',
  function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(1, 3, -1);
      var a2 = new ArithNumber(4, 3, -1);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-3);
      expect(a3.denominator).to.equal(3);
      expect(a3.exponent).to.equal(-1);
      expect(a3.toApproximateString()).to.equal('-0.1');
    });
  });

  describe('Subtract fractions with same denominators and different ' +
  'exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(1, 3, -1);
      var a2 = new ArithNumber(1, 3, -2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(9);
      expect(a3.denominator).to.equal(3);
      expect(a3.exponent).to.equal(-2);
      expect(a3.toApproximateString()).to.equal('0.03');
    });
  });

  describe('Subtract fractions with different denominators and same ' +
  'exponents', function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(123, 3, 2);
      var a2 = new ArithNumber(456, 6, 2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(-210);
      expect(a3.denominator).to.equal(6);
      expect(a3.exponent).to.equal(2);
      expect(a3.toApproximateString()).to.equal('-3500');
    });
  });

  describe('Subtract fractions with different denominators and exponents',
  function() {
    it('Should return accurate difference of two numbers (1)', function() {
      var a1 = new ArithNumber(123, 3, -1);
      var a2 = new ArithNumber(456, 6, -2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(2004);
      expect(a3.denominator).to.equal(6);
      expect(a3.exponent).to.equal(-2);
      expect(a3.toApproximateString()).to.equal('3.34');
    });
  });

  describe('Subtract a NaN and a number', function() {
    it('Should return an inaccurate number (1)', function() {
      var a1 = new ArithNumber();
      var a2 = new ArithNumber(456, 6, -2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.be.NaN;
      expect(a3.denominator).to.be.NaN;
      expect(a3.exponent).to.be.NaN;
      expect(a3.toApproximateString()).to.equal('NaN');
    });

    it('Should return an inaccurate number (2)', function() {
      var a1 = new ArithNumber(456, 6, -2);
      var a2 = new ArithNumber();
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.be.NaN;
      expect(a3.denominator).to.be.NaN;
      expect(a3.exponent).to.be.NaN;
      expect(a3.toApproximateString()).to.equal('NaN');
    });

    it('Should return an inaccurate number (3)', function() {
      var a1 = new ArithNumber();
      var a2 = new ArithNumber();
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.be.NaN;
      expect(a3.denominator).to.be.NaN;
      expect(a3.exponent).to.be.NaN;
      expect(a3.toApproximateString()).to.equal('NaN');
    });
  });

  describe('Subtract large numbers', function() {
    it('Should return an inaccurate number (1)', function() {
      var a1 = ArithNumber.of(-Math.pow(2, 53) + 1);
      var a2 = ArithNumber.of(1);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.be.NaN;
      expect(a3.denominator).to.be.NaN;
      expect(a3.exponent).to.be.NaN;
      expect(a3.toApproximateString()).to.equal('NaN');
    });

    it('Should return an inaccurate number (2)', function() {
      var a1 = ArithNumber.of(1);
      var a2 = ArithNumber.of(-Math.pow(2, 53) + 1);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.be.NaN;
      expect(a3.denominator).to.be.NaN;
      expect(a3.exponent).to.be.NaN;
      expect(a3.toApproximateString()).to.equal('NaN');
    });

    it('Should return an accurate number when reduceable', function() {
      var a1 = new ArithNumber(9007199254740987, 9, 2);
      var a2 = new ArithNumber(-9007199254740987, 9, 2);
      var a3 = subtract(a1, a2);
      expect(a3.numerator).to.equal(2001599834386886);
      expect(a3.denominator).to.equal(1);
      expect(a3.exponent).to.equal(2);
      expect(a3.toApproximateString()).to.equal('200159983438688600');
    });
  });

  describe('Attach the subtract function to ArithNumber.prototype',
  function() {
    it('Should subtract a number of which data type is number', function() {
      var a1 = ArithNumber.of(1.23);
      var a2 = a1.subtract(4.56);
      expect(a2.numerator).to.equal(-333);
      expect(a2.denominator).to.equal(1);
      expect(a2.exponent).to.equal(-2);
      expect(a2.toApproximateString()).to.equal('-3.33');
    });

    it('Should subtract a number of which data type is string', function() {
      var a1 = ArithNumber.of(1.23);
      var a2 = a1.subtract('4.56');
      expect(a2.numerator).to.equal(-333);
      expect(a2.denominator).to.equal(1);
      expect(a2.exponent).to.equal(-2);
      expect(a2.toApproximateString()).to.equal('-3.33');
    });

    it('Should subtract a number of which data type is ArithNumber',
    function() {
      var a1 = ArithNumber.of(1.23);
      var a2 = a1.subtract(ArithNumber.of(4.56));
      expect(a2.numerator).to.equal(-333);
      expect(a2.denominator).to.equal(1);
      expect(a2.exponent).to.equal(-2);
      expect(a2.toApproximateString()).to.equal('-3.33');
    });
  });
});
