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
var datetime = new Date();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views',__dirname+'/Views');
app.set('view engine','jade');


var port = process.env.PORT || 8080; 		// set our port


var mongoose   = require('mongoose');
    mongoose.connect('ashik:ashik@ds047950.mongolab.com:47950/mymongodb',function (error) {
    if (error) {
        console.log(error);
    }
}); // connect to our database

    //Define a schema for our db.
var serverSchema = {host:String,port:String};
var schema = new mongoose.Schema({LoadBalancers:[serverSchema]});
var model = mongoose.model('loadbalancers',schema);
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

router.route("/balancer").get(function(req,res){
        var loadServers = "";
        model.find({},function(err,servers){
                console.log(servers);
                loadServers     = servers[0].LoadBalancers;
                res.render('BalancerIndex',{rows:loadServers});
                res.end();
        });
});

router.route("/LoadConfiguration").post(function(req,res){
    model.find({},function(err,servers){
        console.log(servers);
        var loadServers = servers[0].LoadBalancers;
        var serverId = servers[0]._id;
        var exists = false;
        for(var i=0;i<loadServers.length;i++){
            if(loadServers[i].host == req.body.host && loadServers[i].port == req.body.port){
                console.log(loadServers[i].host+" "+req.body.host+" "+loadServers[i].port+" "+req.body.port);
                exists = true;
            }
        }
        if(exists){
            console.log("Server Already Exists!!!");
            res.send("Server Already Exists");
        }
        else{
            console.log("Server Not Found. Go Ahead And Add");
            model.update({'_id':serverId},{$addToSet:{'LoadBalancers':{"host":req.body.host,"port":req.body.port}}},function(err,data){
                if(err){
                    res.status(400).send(err);
                }
                else{
                    //lb.UpdateProxyTable();
                    fs.writeFile('./dbConfig.txt','Configuration changed on '+datetime,function(err){
                        if(err)throw err;
                        console.log("Configuration changed.");                      
                    });
                    var loadServers = "";
                    model.find({},function(err,servers){
                        loadServers = servers[0].LoadBalancers;
                        res.render('BalancerIndex',{rows:loadServers});
                    });
                }
            });
        }
    });
}).delete(function(req,res){
    model.find({},function(err,servers){
        console.log(servers);
        var loadServers = servers[0].LoadBalancers;
        var serverId = servers[0]._id;
        var exists = false;
        for(var i=0;i<loadServers.length;i++){
            if(loadServers[i].host == req.query.host && loadServers[i].port == req.query.port){
                console.log(loadServers[i].host+" "+req.query.host+" "+loadServers[i].port+" "+req.query.port);
                exists = true;
            }
        }
        if(exists){
            console.log("Server Found. Removing The Server From Loadbalancer Array.");
            model.update({'_id':serverId},{$pull:{'LoadBalancers':{"host":req.query.host,"port":req.query.port}}},function(err,data){
                if(err){
                    res.status(400).send(err);
                }
                else{
                    //lb.UpdateProxyTable();
                    fs.writeFile('./dbConfig.txt','Configuration changed on '+datetime,function(err){
                        if(err)throw err;
                        console.log("Configuration changed.");                      
                    });
                    var loadServers = "";
                    model.find({},function(err,servers){
                        loadServers = servers[0].LoadBalancers;
                        res.render('BalancerIndex',{rows:loadServers});
                    });
                }
            });
        }
        else{
            res.status(400).send(err);
        }   
    });

});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
