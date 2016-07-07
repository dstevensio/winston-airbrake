winston-airbrake
================

An [airbrake][2] transport for [winston][0]. Inspired by [winston-graylog2][1] transport and powered by [node-airbrake][3].

## Installation
Tested on node-0.8.x, requires npm.

``` sh
  $ npm install winston
  $ npm install winston-airbrake
```

## Usage
``` js
  var winston = require('winston');
  winston.add(require('winston-airbrake').Airbrake, options);

```

Options:

* __level:__ Level of messages this transport should log. (default: info)
* __silent:__ Boolean flag indicating whether to suppress output. (default: false)

* __apiKey:__ Valid Airbrake API Key (required)
* __host:__ Your host, to be displayed in Airbrake. (default: require('os').hostname())
* __env:__ Environment, to be displayed in Airbrake. (default: production)

## Extended example of usage
``` js
  var winston = require('winston');
  var Airbrake = require('winston-airbrake').Airbrake;
  var http = require('http');

  var options = {
    "apiKey":"YOUR_API_KEY",
    "host":"YOUR_DOMAIN"
  };
  winston.add(Airbrake, options);

  http.createServer(function(req, res) {
    if (req.url === '/' && req.headers['X-Secret'] !== 'my secret') {
      res.writeHead(403);
      res.end('403 - Permission denied');

      winston.log('info', '403 - Permission denied');

    } else if (req.url === '/breakstuff') {
      res.writeHead(500);
      res.end('500 - Internal Server Error');
    
      winston.log('error', '500 - Internal Server Error');
    }
  }).listen(24755);
```

[0]: https://github.com/flatiron/winston
[1]: https://github.com/flite/winston-graylog2
[2]: https://airbrake.io
[3]: https://github.com/felixge/node-airbrake
