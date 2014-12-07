var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxy();
var http = require('http');

var server = http.createServer(function(req, res) {

    var options = require('./options');
    var latency = require('./latency');
    //var options =  { "foo.com": "http://google.com","www.facebook.com": "http://facebook.com",  "www.google.com": "http://google.com",  "www.google.co.in":"http://google.com", "bar.com": "http://www.google.com","tanishq.co.in":"tanishq.co.in","http://stackoverflow.com":"http://stackoverflow.com"};
    console.log(req.headers.host);
    console.log(options);
    console.log(options[req.headers.host]);
    //res.write(options);
    proxy.on('error', function(err) {
            console.log(err.message);
            res.end(err.message);
        }
    );

    var delay = latency[req.headers.host];
    if (delay == null) {
        delay = 0;
    }
    console.log("delay = " + delay);

    setTimeout(function () {
        proxy.web(req, res, {
            target: options[req.headers.host]
        });
    }, 1000 * delay);

    delete require.cache[require.resolve('./options')]

}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');