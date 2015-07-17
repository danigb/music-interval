# musical-interval

[![Code Climate](https://codeclimate.com/github/danigb/musical-interval/badges/gpa.svg)](https://codeclimate.com/github/danigb/musical-interval)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


_Western, well tempered_ musical intervals in 1.6kb of javascript:

```js
var Interval = require('musical-interval')
var fifth = Interval('P5')
fifth.dist // => 7
```

## Install

Install with npm: `npm i --save musical-interval` or use directly with the browser (although, browserify or webpack is recommended).

## API

### Interval(name)

Create a new interval. It has the following properties:

- name: the name of the interval
- num: the __simplified__ number (always between -9 and 9)
- oct: the number of octaves (can be negative)
- dist: the distance in semitiones (__whithout octaves__: a number between -12 and 12)

```js
Interval('P-5')
// { name: 'P-5', num: -5, oct: 0, dist: -7 }
Interval('M9')
// { name: 'M9', num: 2, oct: 1, dist: 2 }
```

If the string is not a valid interval, an error is thrown:

```js
// throws error
Interval('blahblah')
Interval('a4') // A must be uppercase
Interval('P2') // 2 is not a perfect interval
```

This method can be use `new` operator (`new Interval('P8')`)

## Interval.names([semitones])

If no argument is given, it returns array with the names of all ascending,
simple intervals (between d1 to A8). If a number is provided, it returns the names of all the intervals that have that distance.

# License

MIT License
