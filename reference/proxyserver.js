// proxyserver.js
// @Author Gaurav Bajaj

// BASE SETUP
// =============================================================================

var http = require('http'),
    httpProxy = require('http-proxy');

// Database Connectivity
var mongoose   = require('mongoose');
    mongoose.connect('localhost'); // connect to our database

var SimpleProxyServer = require('./app/models/proxy');




SimpleProxyServer.findById('ProxySettings', function(err, simpleProxyServer) {
      if (err)
        console.log(err);
   var   targetHost = simpleProxyServer.target.host;
     var targetPort = simpleProxyServer.target.port;
    var  forwardHost = simpleProxyServer.forward.host;
    var  forwardPort = simpleProxyServer.forward.port;
var dest = "http://"+targetHost+":"+targetPort;



console.log("targetHost "+targetHost+" targetPort "+targetPort+" forwardHost "+forwardHost+ " forwardPort "+forwardPort);

//
// Create your proxy server and set the target in the options.
//

httpProxy.createProxyServer({target:dest}).listen(Number(forwardPort));


//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(Number(targetPort)); 

    });

