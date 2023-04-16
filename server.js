// server.js

// Require http module
const http = require('http');

// Require fs module
const fs = require('fs');

// Require minimist module (make sure you install this one via npm).
const minimist = require('minimist');

// Use minimist to process one argument `--port=` on the command line after `node server.js`.
const args = minimist(process.argv.slice(2));

// Define a const `port` using the argument from the command line. 
// Make this const default to port 3000 if there is no argument given for `--port`.
const port = args.port || 3000;

// Use the fs module to create an arrow function using `fs.readFile`.
const readFile = (callback) => {
  // The function must read a file located at `./public/index.html` and do some stuff with it.
  fs.readFile('./public/index.html', (err, data) => {
    // If there is an error, put it on the console error and return.
    if (err) {
      console.error(err);
      return;
    }

    // Call the callback with the read data
    callback(data);
  });
};

// Define a const `server` as an arrow function using http.createServer.
const server = http.createServer((req, res) => {
  // Read the content from ./public/index.html
  readFile((data) => {
    // 1. status code 200
    res.statusCode = 200;

    // 2. set a header with content type `text/html`
    res.setHeader('Content-Type', 'text/html');

    // 3. end with the data that you are reading in from ./public/index.html
    res.end(data);
  });
});

// Start the `server` const listening on the port defined by argument in your `port` const.
server.listen(port, () => {
  // Put the exact message `Server listening on port ${port}` on the console log.
  console.log(`Server listening on port ${port}`);
});

// That's it! You're all done!
