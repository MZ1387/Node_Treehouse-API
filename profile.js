const https = require('https');
// require http module for status codes
const http = require('http');

// print error messages
function printError(error) {
  console.error(error.message);
}

// funtion to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points.`;
  console.log(message);
}

function get(username) {
  try {
    // connect to the api url
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

      if (response.statusCode === 200) {
        let body = "";
        // read the data
        response.on('data', data => {
          body += data.toString();
        });

        response.on('end', () => {

          try {
            // parse the data
            const profile = JSON.parse(body);
            // print the data
            printMessage(username, profile.badges.length, profile.points.total)
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }

    });

    request.on('error', printError);

  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
