/**
 * Script that download the resource at the URL to the local path on your machine.
 * 
 * Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
 */

const needle = require('needle');
const fs = require('fs');

const argv = process.argv;
const URL = argv[2]
const destination = argv[3];

needle.get(URL, (error, _response, body) => {
  if (error) {
    return `There was an error: ${error}`;// Print the error if one occurred 
  }

  responseHandler(body); // Passing the URL body content to callback function.
});

// callback. Script that writes the data received to its destination.
const responseHandler = function(response) {
  fs.writeFile(destination, response, error => {
    if (error) {
      return `There was an error writing the data: ${error}`;
    } else {
      dataSize(destination);
    }
  })
}

//callback. Script that calculate the size of the downloaded data.
const dataSize = function(data) {
  fs.stat(data, (error, stats) => {
    if (error) {
      return `There was an error getting the size of the data: ${error}`;
    } else {
      console.log(`Downloaded and saved ${stats.size} bytes to ${data}`)
    }
  });
}