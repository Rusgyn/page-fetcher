/**
 * Script that download the resource at the URL to the local path on your machine.
 * 
 * Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.
 */

const needle = require('needle');
const fs = require('fs');
const readline = require("readline");
const removeAllListeners = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = process.argv;
const URL = argv[2]
const destination = argv[3];

// Error Handling. Script that checks if the location is empty/not empty.
fs.readFile(destination, 'utf8', (error, data) => {
  if (error) {
    console.log(error);
  } else if (data.length !== 0) { // Not empty

    rl.question("Do you want to overwrite your file? Press Y for Yes or N for No ", (answer) => {
      console.log(`You replied: ${answer}`);
      if (answer === "Y") {
        requestHandler(URL);
      } else if (answer === "N") {
        console.log("Thank you for trying. Consider different file location.");
        rl.close();
      } else {
        console.log("Choose only Y or N")
        rl.close();
      }

    rl.close();
    });

  } else if (data.length === 0) {
    requestHandler(URL);
  }

});

// Script that will make the HTTP request using needle
const requestHandler = function(URL) {
  needle.get(URL, (error, _response, body) => {
    if (error) {
      return `There was an error: ${error}`;// Print the error if one occurred 
    }
  
    responseHandler(body); // Passing the URL body content to callback function.
  });
}

// callback. Script that writes the data received to its destination.
const responseHandler = function(response) {
  fs.writeFile(destination, response, error => {
    if (error) {
      return `There was an error writing the data: ${error}`;
    } else  {
      dataSize(destination);
    }
  })
}

//callback. Script that calculate the size of the downloaded data.
const dataSize = function(data) {
  fs.stat(data, (error, stats) => {
    if (error) {
      console.log(`There was an error getting the size of the data: ${error}`);
      return;
    } else {
      console.log(`Downloaded and saved ${stats.size} bytes to ${data}`);
      return;
    }
  });
}

rl.removeAllListeners();