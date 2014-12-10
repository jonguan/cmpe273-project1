// server.js
// @Author Gaurav Bajaj

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var fse = require('fs-extra');
var jf = require('jsonfile');
var optionsFile = './options.json';
var latencyFile = './latency.json';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
    mongoose.connect('localhost'); // connect to our database
var Bear     = require('./app/models/bear');
var SimpleProxyServer = require('./app/models/proxy');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


// REST APIs for our server
// =============================================================================
router.route('/SimpleProxyServer')

	// create a simple Proxy Server payload (accessed at POST http://localhost:8080/api/SimpleProxyServer)
	.post(function(req, res) {
		  
		var simpleProxyServer = new SimpleProxyServer();  // create a new instance of the Simple Proxy Server
		simpleProxyServer._id = 'ProxySettings';
		simpleProxyServer.target = req.body.target;  // set the bears name (comes from the request)
        simpleProxyServer.forward = req.body.forward ;
		// save the SimpleProxyServer and check for errors
		simpleProxyServer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'SimpleProxyServer settings created!' });
		});
		
	})
.put(function(req, res) {

		// use our bear model to find the bear we want
		SimpleProxyServer.findById('ProxySettings', function(err, simpleProxyServer) {

			if (err)
				res.send(err);

			simpleProxyServer.target = req.body.target; 	// update the target
			simpleProxyServer.forward = req.body.forward; 	// update the target

			// save the bear
			simpleProxyServer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'ProxySettings updated!' });
			});

		});
	});


	router.route('/RouterSettings')

	// create a simple Proxy Server payload (accessed at POST http://localhost:8080/api/RouterSettings)
	.post(function(req, res) {
		 
	
		 console.log(req.body);


	jf.writeFile(optionsFile,req.body, function(err) {
		if(err){
		res.json({ message:err});
  console.log(err);
}
});
 res.json({ message: 'Router Configurations Saved' });
	});


//Latency Settings

router.route('/LatencySettings')

	// create a simple Proxy Server payload (accessed at POST http://localhost:8080/api/LatencySettings)
	.post(function(req, res) {
		
		 console.log(req.body);

	jf.writeFile(latencyFile,req.body, function(err) {
		if(err){
		res.json({ message:err});
  console.log(err);
}
});
 res.json({ message: 'Latency Configurations Saved!' });
	});




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
