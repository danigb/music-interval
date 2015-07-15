# musical-interval

[![Code Climate](https://codeclimate.com/github/danigb/musical-interval/badges/gpa.svg)](https://codeclimate.com/github/danigb/musical-interval)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


_Western, well tempered_ musical intervals in 1.2kb of javascript:

```js
var Interval = require('musical-interval')
var fifth = new Interval('P5')
```

## Install

Install with npm: `npm i --save musical-interval` or use directly with the browser (although, browserify or webpack is recommended).

## API

### new Interval(name)

Create a new interval. It has the following properties:
- name: the name of the interval
- num: the simplified number (always between -9 and 9)
- oct: the number of octaves (can be negative)
- dist: the distance in semitiones (whithout octaves). Can be negative

```js
new Interval('P-5')
// { name: 'P-5', num: -5, oct: 0, dist: -7 }
new Interval('M9')
// { name: 'M9', num: 2, oct: 1, dist: 2 }
```

If the string is not a valid interval, an error is thrown:

```js
// throws error
new Interval('blahblah')
new Interval('a4') // A must be uppercase
new Interval('P2') // 2 is not a perfect interval
```

This method can be use without `new` operator.

## Interval.names

An array with the __names__ of all ascending, simple intervals (between d1 to A8)

## Interval.intervals

An array with the __interval objects__ for all the ascending simple intervals (between d1 to A8)

# License

MIT License
