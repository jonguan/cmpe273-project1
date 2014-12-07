/* Port forwarding
 To forward from localhost:9001 => localhost:80

$ node proxy.js 9001 80
Or localhost:9001 => otherhost:80

$ node proxy.js 9001 otherhost:80
*/

//To use the HTTP server and client one must require('http').
var http = require('http');
/*The net module provides you with an asynchronous network wrapper. 
It contains methods for creating both servers and clients (called streams). 
You can include this module with require('net');
*/
var net = require('net');

var httpProxy = require('http-proxy');
var HttpMaster = require('http-master');

// var httpMaster = new HttpMaster();
// httpMaster.init({
//  // your config in here
//  ports: {
//     8000 : 8081
//   }
// }, function(err) {
//  // listening
// });


// Old implementation
/*
// parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

var addr = {
    from: addrRegex.exec(process.argv[2]),
    to: addrRegex.exec(process.argv[3]), 
    timeout: process.argv[4]
};

// Timeout is optional
if (!addr.from || !addr.to) {
    console.log('Usage: <from> <to> [<timeout-in-seconds>]');
    return;
}

net.createServer(function(from) {
    var to = net.createConnection({
        host: addr.to[2],
        port: addr.to[3]
    });
    var timeout = addr.timeout;
    if (timeout == null) {
        timeout = 0;
    }
    console.log("timeout is " + timeout );

    setTimeout(function() {
        from.pipe(to);
        to.pipe(from);
    }, timeout * 1000);
   
    
}).listen(addr.from[3], addr.from[2]);
*/