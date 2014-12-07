cmpe273-project1
================

CMPE273 - Project 

Install dependencies
===============
% npm install

Make sure mongo is up and running on machine:
% mongod

Run the backend server to manipulate options.json:
% node server.js

Options.json is used as a routing table by routingTable.js

Use routingTable.js as the proxy server via

% node routingTable.js

Listens on Port 8000

Old
===================
% node proxy.js <from> <to> <timeout-in-seconds>

To forward from localhost:9001 => localhost:80

$ node proxy.js 9001 80

Or localhost:9001 => otherhost:80

$ node proxy.js 9001 otherhost:80


