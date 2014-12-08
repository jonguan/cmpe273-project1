//Load Balancer Server
//author -- Sneha

var http = require('http'),
    httpProxy = require('http-proxy');
	
var fs = require('fs');
var uniqueId = require('node-uuid');

var mongoose   = require('mongoose');
    mongoose.connect('ashik:ashik@ds047950.mongolab.com:47950/mymongodb',function (error) {
    if (error) {
        console.log(error);
    }
});

var addresses = [];
var host = "";
var port = "";
var serverSchema = {host:String,port:String};
var schema = new mongoose.Schema({LoadBalancers:[serverSchema]});
var model = mongoose.model('loadbalancers',schema);
model.find({},{_id:0},function(err,servers){
	var loadServers = servers[0].LoadBalancers;
	for(var i=0;i<loadServers.length;i++){
		if(typeof loadServers[i].host != 'undefined' && typeof loadServers[i].port != 'undefined'){
			addresses.push(loadServers[i].host+":"+loadServers[i].port);
			host = loadServers[i].host;
			port = loadServers[i].port;
			console.log(addresses);
		}
	}
});

var proxy = httpProxy.createServer();

fs.watchFile('./dbConfig.txt',function(curr,prev){
	addresses = [];
	console.log("Configuration changed. Contacting DB for new configuration");
	model.find({},{_id:0},function(err,servers){
		var loadServers = servers[0].LoadBalancers;
		for(var i=0;i<loadServers.length;i++){
			if(typeof loadServers[i].host != 'undefined' && typeof loadServers[i].port != 'undefined'){
				addresses.push(loadServers[i].host+":"+loadServers[i].port);
				host = loadServers[i].host;
				port = loadServers[i].port;
				console.log(addresses);
			}
		}
	});
})

http.createServer(function (req, res) {
  //
  // On each request, get the first location from the list...
  //
  var target = { target: addresses.shift() };
  var success = true;
  res.setHeader('X-HTTP-request-id',uniqueId.v1());
  //
  // ...then proxy to the server whose 'turn' it is...
  //
  console.log('balancing request to: ', target);
  proxy.web(req, res, target,function(e){
		console.log("Server Not Found. Please Make Sure The Server Is Running");
		res.end("Server "+target.target+" not found");
	  });
  //
  // ...and then the server you just used becomes the last item in the list.
  //
  addresses.push(target.target);
}).listen(8021);
