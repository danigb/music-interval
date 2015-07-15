var vows = require('vows')
var assert = require('assert')
var Interval = require('../')

vows.describe('Tonal intervals').addBatch({
  'simple intervals': function () {
    Interval.all.forEach(function (interval) {
      var i = Interval(interval.name)
      assert.equal(i.oct, 0)
      delete i.oct
      assert.deepEqual(i, interval)
    })
  },
  'compound intervals': function () {
    Interval.all.forEach(function (interval) {
      var num = +interval.name.slice(1)
      var i = Interval(interval.name[0] + (num + 7))
      if (num > 1) assert.equal(i.oct, 1)
    })
  },
  'descendent simple intervals': function () {
    Interval.all.forEach(function (interval) {
      var i = Interval(interval.name[0] + '-' + interval.name.substring(1))
      assert.equal(i.dist, -1 * interval.dist)
      assert.equal(i.num, -1 * interval.num)
    })
  },
  'invalid intervals': function () {
    assert.throws(function () { Interval('m1') }, /valid/)
  }
}).export(module)
