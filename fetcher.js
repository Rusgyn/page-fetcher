const request = require('request');
const process = require('process');
const fs = require('fs');

let args = process.argv;
let url = args[2];
let destination = args[3];

const makeRequest = function(url, responseHandler) {
  //The underscore(_) written before error and response to represent that these parameters are not in use but needed as part of the `request` syntax.
  request(url, (_error, _response, body) => {
    responseHandler(body); // callback
  });
};

//The callback function, will do the process of saving our data to our local destination.
const responseHandler = function(response) {
  //saving the url body file to our destination.
  fs.writeFile(destination, response, err => {
    if (err) {
      console.error(err); //console.error() writes to stderr.
    } else {
      //get the file size.
      fs.stat(destination, (err, fileStats) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Downloaded and saved ${fileStats.size} bytes to ${destination}.`);
        }
        //Other solution in obtaining the fie size.
        // let fileStat = fs.statSync(destination); //to get the file stats
        // console.log(`Downloaded and saved ${fileStat.size} bytes to ${destination}.`); //.size to obtained the file size.
      });

    }
  });
};

makeRequest(url, responseHandler);

/*
//Test Case

> node fetcher.js http://www.example.edu ./index.html page-downloader assignment
// => Downloaded and saved 1256 bytes to ./index.html.

Note:
The url = http://www.example.edu
The destination = index.html (same location as fetcher.js)

*/