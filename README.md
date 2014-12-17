cmpe273-project1
================

CMPE273 - Project 

# Install dependencies

% npm install

# Running the code
Make sure mongo is up and running on machine:

% mongod

Run the backend server to manipulate options.json:

% node server.js

Options.json is used as a routing table by routingTable.js

{requestedAddress:forwardedAddress}

latency.json is used as a table to map request address to the relevant latency.

{requestedAddress:latency}

TODO: Possibly combine options.json and latency.json as such:

{ requestedAddress : {
                        "forwardTo":forwardedAddress
                        "latency":latency
                        }
}

Use routingTable.js as the proxy server via

% node routingTable.js

Listens on Port 8000


In computer, go to Network Settings --> Proxy --> Set 54.149.154.58:8000 as web proxy


# UI

Open index.html page in dist folder for the main page.

It will navigate to the further pages.

# Amazon instance
http://54.149.154.58:8080/api/

When running the code in chrome, install chrome-plugin Allow-Control-Allow-Origin: *

Headers to accept are:

http-processing-time, X-HTTP-request-id, x-http-processing-time, Content-Encoding
