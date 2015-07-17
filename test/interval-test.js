var vows = require('vows')
var assert = require('assert')
var Interval = require('../')

function simples () {
  return Interval.names().map(Interval)
}

vows.describe('Tonal intervals').addBatch({
  'names': function () {
    assert.deepEqual(Interval.names(2), ['M2', 'd3'])
    assert.deepEqual(Interval.names(-2), ['M-2', 'd-3'])
    assert.deepEqual(Interval.names(14), ['M9', 'd10'])
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
