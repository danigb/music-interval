var vows = require('vows')
var assert = require('assert')
var Interval = require('../')

function simples () {
  return Interval.names().map(Interval)
}

vows.describe('Intervals').addBatch({
  'names': {
    'all names': function () {
      assert.deepEqual(Interval.names(), ['d1', 'P1', 'A1', 'd2', 'm2', 'M2', 'A2',
        'd3', 'm3', 'M3', 'A3', 'd4', 'P4', 'A4', 'd5', 'P5', 'A5', 'd6', 'm6', 'M6', 'A6',
        'd7', 'm7', 'M7', 'A7', 'd8', 'P8', 'A8'])
    },
    'ascending': function () {
      assert.deepEqual(Interval.names(2), ['M2', 'd3'])
      assert.deepEqual(Interval.names(7), ['P5', 'd6'])
      assert.deepEqual(Interval.names(-2), ['M-2', 'd-3'])
      assert.deepEqual(Interval.names(14), ['M9', 'd10'])
    }
  },
  'invert': function () {
    assert.deepEqual(Interval('P5').invert(), Interval('P4'))
    assert.deepEqual(Interval('P4').invert(), Interval('P5'))
    assert.deepEqual(Interval('M3').invert(), Interval('m6'))
    assert.deepEqual(Interval('M7').invert(), Interval('m2'))
    assert.deepEqual(Interval('m-2').invert(), Interval('M-7'))
    assert.deepEqual(Interval('A-3').invert(), Interval('d-6'))
    assert.deepEqual(Interval('M9').invert(), Interval('m7'))
    assert.deepEqual(Interval('M-9').invert(), Interval('m-7'))
  },
  'simple intervals': function () {
    simples().forEach(function (interval) {
      var i = Interval(interval.name)
      assert.deepEqual(i, interval)
    })
  },
  'compound intervals': function () {
    simples().forEach(function (interval) {
      var num = +interval.name.slice(1)
      var i = Interval(interval.name[0] + (num + 7))
      if (num > 1) assert.equal(i.oct, 1)
    })
  },
  'descendent simple intervals': function () {
    simples().forEach(function (interval) {
      var i = Interval(interval.name[0] + '-' + interval.name.substring(1))
      assert.equal(i.dist, -1 * interval.dist)
      assert.equal(i.num, -1 * interval.num)
    })
  },
  'invalid intervals': function () {
    assert.throws(function () { Interval('m1') }, /valid/)
  }
}).export(module)
