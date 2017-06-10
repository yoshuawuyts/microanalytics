# microanalytics [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Capture analytics events in the browser. Uses `window.navigator.sendBeacon()`
to send data down with the least priority.

Friendly reminder not to ever store people's IP addresses. Only store the
minimum amount of data needed to inform decisions. Be kind, don't give
analytics a bad name.

## Usage
```js
var microanalytics = require('microanalytics')
var analytics = microanalytics('https://analytics.my-app.com')

analytics.append({
  type: 'navigation'
  route: '/my-route'
})

analytics.append({
  type: 'navigation'
  route: '/my-other-route'
})

var tx = analytics.batch()
tx.append({
  type: 'video',
  data: {
    offset: 1225,
    buf: 20
  }
})

tx.append({
  type: 'video',
  data: {
    offset: 15,
    buf: 26
  }
})

tx.flush()
```

## `analytics = microanalytics(url, [defaultArgs])`
Create a new analytics instance. Takes a url and optional default options which
are always sent down.

## `analytics.append(data)`
Send new data down to the analytics API.

## `transaction = analytics.batch`
Create a new transaction. Transaction data will be sent as an array of data
once it's flushed.

## `transaction.append(data)`
Append new data to the transaction.

## `transaction.flush()`
End the transaction.

## See Also
- [shipharbor/analytics-service](https://github.com/shipharbor/analytics-service)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/microanalytics.svg?style=flat-square
[3]: https://npmjs.org/package/microanalytics
[4]: https://img.shields.io/travis/yoshuawuyts/microanalytics/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/microanalytics
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/microanalytics/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/microanalytics
[8]: http://img.shields.io/npm/dm/microanalytics.svg?style=flat-square
[9]: https://npmjs.org/package/microanalytics
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
