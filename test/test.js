var vows = require('vows')
var assert = require('assert')
var interval = require('../')

vows.describe('interval/semitones').addBatch({
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
        [-1, -1, -3, -4, -6, -8, -10])
    }
  }
}).export(module)
