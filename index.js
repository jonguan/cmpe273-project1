//To use the HTTP server and client one must require('http').
var http = require('http');
/*The net module provides you with an asynchronous network wrapper. 
It contains methods for creating both servers and clients (called streams). 
You can include this module with require('net');
*/
// var net = require('net');
var connect = require('connect');
var app = connect();
app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
	switch (request.method) {
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
};

function get(request, response) {
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) {
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) {
	// Read 'name and email from the request.body'
	var aname = request.body.name;
	var aemail = request.body.email;
	console.log(request.body)
	

	// Set new session id to the 'session_id' cookie in the response
	response.writeHead(200, {'Content-Type': 'application/json'});
	// response.write('{"hello":"world"}');
	response.end(JSON.stringify(request.body));
};

function del(request, response) {
	console.log("DELETE:: Logout from the server");
 	// TODO: remove session id via login.logout(xxx)
 	// No need to set session id in the response cookies since you just logged out!
 	var sess_id = request.cookies['session_id'];

 	if (login.isLoggedIn(sess_id)) {
		login.logout(sess_id);
 		response.writeHead(200, {'Content-Type': 'text/plain'});
  		response.end('Logged out from the server\n');
 	} else {
 		response.end('Invlaid session_id! please login again\n');
 	};
 	
};

function put(request, response) {
	console.log("PUT:: Re-generate new session_id for the same user");

	// TODO: refresh session id; similar to the post() function
	var newSessionId = login.refresh(request.cookies['session_id']);
	console.log("PUT:: new session id = " + newSessionId);
	if (newSessionId != null) {
		 response.writeHead(200, {'Content-Type': 'text/plain', 'Set-Cookie':'session_id='+newSessionId});
		 response.end("Re-freshed session id\n");
	} else {
		response.writeHead(403, {'Content-Type': 'text/plain'});
		response.end('session_id not found\n');
	};
	
};

app.listen(8000);

console.log("Node.JS server running at 8000...");