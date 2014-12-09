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



# Old

% node proxy.js <from> <to> <timeout-in-seconds>

To forward from localhost:9001 => localhost:80

$ node proxy.js 9001 80

Or localhost:9001 => otherhost:80

$ node proxy.js 9001 otherhost:80



# UI

Open index.html page in dist folder for the main page.

It will navigate to the further pages. If you want to link your html page to index.html, you need to add the location of the file at the "href" tag in the line corresponsing to that feature button.
