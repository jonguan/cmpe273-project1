cmpe273-project1
================
hi
CMPE273 - Project 

To run the server, put the code into a file example.js and execute it with the node program from the command line:

% node index.js

Listens on Port 8000

% node proxy.js <from> <to> <timeout-in-seconds>

To forward from localhost:9001 => localhost:80

$ node proxy.js 9001 80

Or localhost:9001 => otherhost:80

$ node proxy.js 9001 otherhost:80

We can also install nodejitsu:

https://github.com/nodejitsu/node-http-proxy

** //Description of changes by Gaurav Bajaj start**

Use server.js to manipulate options.json
Options.json is used as a routing table by routingTable.js
We'll use routingTable.js code in our proxy server
** //Description of changes by Gaurav Bajaj end**
