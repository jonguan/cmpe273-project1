//Author -- kiran
var http = require('http');
var util = require('util');
http.createServer(function (req, res) {
	var afterDate = new Date();
	var afterTime = afterDate.getTime();
	console.log("Time On Server "+afterTime);
	var beforeTime = req.headers['x-http-processing-time'];
	if(beforeTime === 'undefined'){
		console.log("Loadbalancer Time Is Undefined.");
	}
	else{
		console.log("Time On Loadbalancer Picked From The Header "+beforeTime);
		var processingTime = afterTime - beforeTime;
		console.log("processingTime : "+processingTime);
		res.setHeader("X-HTTP-Processing-Time",processingTime);
	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Server 1\n');
}).listen(8180, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8180/');