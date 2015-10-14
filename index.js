
var asInterval = require('interval-parser')
var isArray = Array.isArray

function decorate (fn) {
  return function (interval) {
    if (isArray(interval)) return fn(interval)
    var i = asInterval.parse(interval)
    return i !== null ? asInterval.stringify(fn(i)) : null
  }
}

var SEMITONES = [0, 2, 4, 5, 7, 9, 11]
var TYPES = 'PMMPPMM'

function interval () {

}

/**
 * Simplify an interval
 *
 * @name simplify
 * @param {String|Array} interval - the interval to be simplified
 * @return {String|Array} the simplified interval
 *
 * @example
 * simplify('9M') // => '2M'
 * simplify('-9M') // => '-2M'
 */
function simplify (i) {
  var num = i[0] % 7
  var oct = 0

  if (num === 0 && i[2] > 0) oct = i[2] > 0 ? 1 : -2
  else if (i[2] < 0) oct = -1

  return [num, i[1], oct]
}
interval.simplify = decorate(simplify)

/**
 * Get the inversion of an interval. The inversion of an interval is always a
 * simple interval
 *
 * @name invert
 * @param {String|Array} interval - the interval to be inverted
 * @return {String|Array} the inverted interval
 *
 * @example
 * invert('3M') // => '6m'
 */
function invert (i) {
  var t = type(i[0])
  var simple = (6 - i[0]) + 1
  var alt = t === 'P' ? -i[1] : -(i[1] + 1)
  var oct = i[2]
  if (simple === 7) oct += i[2] < 0 ? -1 : 1
  return simplify([simple, alt, oct])
}
interval.invert = decorate(invert)

/**
 * Get the type of an interval (`'P'` for __perfetable__ and `'M'` for __majorable__)
 *
 * It does NOT return the quality of the interval (@see interval/quality)
 *
 * @name type
 * @param {String|Array|Integer} interval - the interval
 * @return {String} one letter: P or M describing the interval type
 *
 * @example
 * type('4P') // => 'P'
 * type('5A') // => 'P'
 * type('3m') // => 'M'
 * type('2d') // => 'M'
*/
function type (interval) {
  if (!isNaN(interval)) return TYPES[Math.abs(interval) % 7]
  var i = asInterval.parse(interval)
  return interval ? type(i[0]) : null
}
interval.type = type

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
  * Get the semitones of a interval
  *
  * @name semitones
  * @param {String} interval - the interval to get the semitones number from
  * @return {Interger} the semitones (can be negative for descending intervals)
  *
  * @example
  * semitones('5P') // => 7
  * semitones('-5P') // => -7
  */
function semitones (interval) {
  var i = isArray(interval) ? interval : asInterval.parse(interval)
  if (!i) return null
  return ((SEMITONES[i[0]] + i[1]) + 12 * i[2])
}
interval.semitones = semitones

module.exports = interval
