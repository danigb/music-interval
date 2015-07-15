'use strict'

var DISTANCES = { 'd1': -1, 'P1': 0, 'A1': 1, 'd2': 0, 'm2': 1, 'M2': 2,
  'A2': 3, 'd3': 2, 'm3': 3, 'M3': 4, 'A3': 5, 'd4': 4, 'P4': 5, 'A4': 6,
  'd5': 6, 'P5': 7, 'A5': 8, 'd6': 7, 'm6': 8, 'M6': 9, 'A6': 10, 'd7': 9,
  'm7': 10, 'M7': 11, 'A7': 12, 'd8': 11, 'P8': 12, 'A8': 13 }
var REGEX = /([AdmMP])(-?)(\d+)/

function Interval (name) {
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

  var simple = Interval.byName[match[1] + this.num]
  if (!simple) throw Error('Interval not valid: ' + name + ' ' + match[1] + this.num)
  this.dist = simple.dist

  if (match[2] === '-') {
    this.dist *= -1
    this.num *= -1
    this.oct *= -1
  }
}

Interval.names = Object.keys(DISTANCES)
Interval.byName = {}
Interval.all = []
Interval.names.forEach(function (name) {
  var i = { name: name, dist: DISTANCES[name], num: +name.substring(1) }
  Interval.byName[name] = i
  Interval.all.push(i)
})

if (typeof module === 'object' && module.exports) module.exports = Interval
if (typeof window !== 'undefined') window.Interval = Interval
