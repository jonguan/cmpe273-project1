// app/models/proxy.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProxySchema   = new Schema({
	_id:String,
target: {
  port:{type:Number, min:0},
  host:String
},
forward: {
  port:{type:Number, min:0},
  host:String
}

});

module.exports = mongoose.model('Proxy', ProxySchema);
