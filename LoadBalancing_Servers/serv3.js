//Author -- kiran
var http = require('http');
var util = require('util');
var serv = http.createServer(function (req, res) {
	for(var i=0;i<5000;i++){
		var j=i;
	}
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
	res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*','access-control-expose-headers':'X-HTTP-request-id, x-http-processing-time'});
	res.end('Hi from Server at 8182\n');
});
serv.listen(8182);
//	res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'*','access-control-expose-headers':'X-HTTP-request-id, x-http-processing-time'});
//	res.end('Server 1\n');
//}).listen(8182, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8182/');
