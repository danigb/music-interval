'use strict'

var REGEX = /([AdmMP])(-?)(\d+)/
var DISTANCES = { 'd1': -1, 'P1': 0, 'A1': 1, 'd2': 0, 'm2': 1, 'M2': 2,
  'A2': 3, 'd3': 2, 'm3': 3, 'M3': 4, 'A3': 5, 'd4': 4, 'P4': 5, 'A4': 6,
  'd5': 6, 'P5': 7, 'A5': 8, 'd6': 7, 'm6': 8, 'M6': 9, 'A6': 10, 'd7': 9,
  'm7': 10, 'M7': 11, 'A7': 12, 'd8': 11, 'P8': 12, 'A8': 13 }
var INTERVALS = { '-1': ['d1'], '0': ['P1', 'd2'], '1': ['A1', 'm2'],
  '2': ['M2', 'd3'], '3': ['A2', 'm3'], '4': ['M3', 'd4'], '5': ['A3', 'P4'],
  '6': ['A4', 'd5'], '7': ['P5', 'd6'], '8': ['A5', 'm6'], '9': ['M6', 'd7'],
  '10': ['A6', 'm7'], '11': ['M7', 'd8'], '12': ['A7', 'P8'], '13': ['A8'] }
var NAMES = Object.keys(DISTANCES)

function Interval (name) {
  if (name instanceof Interval) return name
  if (!(this instanceof Interval)) return new Interval(name)

  var match = REGEX.exec(name)
  if (!match) throw Error('Not an interval: ' + name)

  this.name = name
  this.num = +match[3]
  this.oct = 0
  while (this.num > 8) {
    this.num -= 7
    this.oct++
  }

  this.dist = DISTANCES[match[1] + this.num]
  if (this.dist === undefined) {
    throw Error('Interval not valid: ' + name + ' ' + match[1] + this.num)
  }

  if (match[2] === '-') {
    this.dist *= -1
    this.num *= -1
    this.oct *= -1
  }
}

var INVERT = {'d': 'A', 'm': 'M', 'P': 'P', 'M': 'm', 'A': 'd'}
Interval.prototype.invert = function () {
  var pivot = this.num < 0 ? -9 : 9
  var num = pivot - this.num
  var q = INVERT[this.name[0]]
  return new Interval(q + num)
}

Interval.names = function (distance) {
  if (!distance) return NAMES
  var abs = Math.abs(distance)
  var octaves = Math.floor(abs / 12)
  var mod = distance < 0 ? '-' : ''
  return INTERVALS[abs % 12].map(function (name) {
    return name[0] + mod + (+name[1] + 7 * octaves)
  })
}

if (typeof module === 'object' && module.exports) module.exports = Interval
if (typeof window !== 'undefined') window.Interval = Interval
