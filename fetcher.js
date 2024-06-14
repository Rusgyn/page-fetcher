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
});

