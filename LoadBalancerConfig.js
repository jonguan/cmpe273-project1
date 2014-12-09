// LoadBalancerConfig.js
// @Author Ashik Hariprasad
// call the packages we need
var express    = require('express');            // call express
var app        = express();                             // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var datetime = new Date();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views',__dirname+'/Views');
app.set('view engine','jade');

var port = process.env.PORT || 8080;            // set our port

var mongoose   = require('mongoose');
    mongoose.connect('ashik:ashik@ds047950.mongolab.com:47950/mymongodb',function (error) {
    if (error) {
        console.log(error);
    }
}); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
        console.log('Configuring The Loadbalancer.');
        next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
        res.json({ message: 'The Load Balancer Configuration API.\nConfigurations done through REST calls.' });
});

//REST APIs  to configure load balancer.
//The configurations are set in MongoDb.
//The following are the list of configurations that can be set.
//              Add a server to the list of servers under load balancer:
//                      path:   /api/LoadBalancer
//                      method: post
//                      body:    {"host":"123.456.789.1","port":"80"}
//              Remove a server.
//                      path: /api/LoadBalancer
//                      method: delete
//                      body: {"host":"123.456.789.1"}
//              Update server settings:
//                      path: /api/LoadBalancer
//                      method: put
//                      body: {"host":"123.456.789.1","port":<newPORT>}

//Define a schema for our db.
var serverSchema = {host:String,port:String};
var schema = new mongoose.Schema({LoadBalancers:[serverSchema]});
var model = mongoose.model('loadbalancers',schema);

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
                                                loadServers     = servers[0].LoadBalancers;
                                                res.render('BalancerIndex',{rows:loadServers});
                                        });
                                }
                        });
                }
        });
        /*
        toSave.save(function(err){

                if(err){
                        console.log("ERROR PUTTING");
                        res.send("ERROR");
                }
                else{
                        console.log("SUCCESS PUTTING.");
                        res.send("SUCCESS");
                }
        });*/
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('The Load Balancer Configuration API.\nConfigurations done through REST calls.');
