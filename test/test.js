var vows = require('vows')
var assert = require('assert')
var interval = require('../')

function types (intervals) {
  intervals = typeof intervals === 'string' ? intervals.split(' ') : intervals
  return intervals.map(interval.type).join('')
}

function inversions (intervals) {
  return intervals.split(' ').map(interval.invert).join(' ')
}

vows.describe('music-interval').addBatch({
  'interval': function () {
    assert.equal(interval('2'), '2M')
    assert.equal(interval([1, 1, 3]), '23A')
    assert.equal(interval('blah'), null)
  },
  'simplify': {
    'simplify ascending intervals': function () {
      assert.equal(interval.simplify('9M'), '2M')
      assert.equal(interval.simplify('9A'), '2A')
      assert.equal(interval.simplify('8P'), '8P')
      assert.equal(interval.simplify('15P'), '8P')
      assert.equal(interval.simplify('13d'), '6d')
    },
    'simplify descending intervals': function () {
      assert.equal(interval.simplify('-9M'), '-2M')
      assert.equal(interval.simplify('-9A'), '-2A')
      assert.equal(interval.simplify('-8P'), '-8P')
      assert.deepEqual(interval.simplify([0, 1, -1]), [0, 1, -1])
      assert.equal(interval.simplify('-8A'), '-8A')
      assert.equal(interval.simplify('-29A'), '-8A')
    }
  },
  'invert interval': {
    'basic inversion': function () {
      assert.equal(interval.invert('2M'), '7m')
      assert.equal(interval.invert('1P'), '8P')
    },
    'simple inversions': function () {
      assert.equal(inversions('1P 2M 3M 4P 5P 6M 7M'), '8P 7m 6m 5P 4P 3m 2m')
      assert.equal(inversions('-1P -2M -3M -4P -5P -6M -7M'), '8P -7m -6m -5P -4P -3m -2m')
    },
    'compound inversions': function () {
      assert.equal(inversions('1P 9M 10M 11P 12P 13M 14M'), '8P 7m 6m 5P 4P 3m 2m')
      assert.equal(inversions('1P -9M -10M -11P -12P -13M -14M'), '8P -7m -6m -5P -4P -3m -2m')
    }
  },
  'type': {
    'interval types': function () {
      assert.equal(types('1P 2M 3M 4P 5P 6M 7M'), 'PMMPPMM')
      assert.equal(types('8P 9M 10M 11P 12P 13M 14M'), 'PMMPPMM')
      assert.equal(types('-1P -2M -3M -4P -5P -6M -7M'), 'PMMPPMM')
      assert.equal(types('-8P -9M -10M -11P -12P -13M -14M'), 'PMMPPMM')
    },
    'numbers': function () {
      assert.equal(types([0, 1, 2, 3, 4, 5, 6]), 'PMMPPMM')
      assert.equal(types([7, 8, 9, 10, 11, 12, 13]), 'PMMPPMM')
    }
  },
  'semitones': {
    'semitones of ascending': function () {
      assert.deepEqual('1P 2M 3M 4P 5P 6M 7M'.split(' ').map(interval.semitones),
        [0, 2, 4, 5, 7, 9, 11])
      assert.deepEqual('1d 2m 3m 4d 5d 6m 7m'.split(' ').map(interval.semitones),
        [-1, 1, 3, 4, 6, 8, 10])
      assert.deepEqual('8P 9M 10M 11P 12P 13M 14M'.split(' ').map(interval.semitones),
        [12, 14, 16, 17, 19, 21, 23])
    },
    'semitones of descending': function () {
      assert.deepEqual('-1P -2M -3M -4P -5P -6M -7M'.split(' ').map(interval.semitones),
        [0, -2, -4, -5, -7, -9, -11])
      assert.deepEqual('-1d -2m -3m -4d -5d -6m -7m'.split(' ').map(interval.semitones),
        [1, -1, -3, -4, -6, -8, -10])
    }
  }
}).export(module)
