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


In computer, go to Network Settings --> Proxy --> Set localhost:8000 as web proxy


# UI

Open index.html page in dist folder for the main page.

It will navigate to the further pages.
