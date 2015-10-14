
var asInterval = require('interval-parser')

var SEMITONES = [0, 2, 4, 5, 7, 9, 11]

function interval () {

}

/**
 * Get the [inversion](https://en.wikipedia.org/wiki/Interval_(music)#Inversion)
 * of an interval.
 *
 * Notice that all inverted intervals are simple.
 *
 * @param {String|Array} interval - the interval to invert
 *
 * @example
 * invert('M9') // => 'M2'
 * invert('M-10') // => 'M-3'
 * invert('P-11', true) // => 'P4'
 */

/**
 *
 */
function semitones (interval) {
  var i = asInterval.parse(interval)
  if (i[2] < 0) {
    return -SEMITONES[7 - i[0]] - i[1]
  } else {
    return SEMITONES[i[0]] + i[1] + 12 * i[2]
  }
}

interval.semitones = semitones

module.exports = interval
