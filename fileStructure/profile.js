const https = require('https');
const http = require('http');

const printError = (error) => {
    console.error(error.message);
}

// to print message to console
const printMessage = (username, badgeCount, points) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} in JS.`;
    console.log(message);
}

// printMessage('hmiu', 100, 300923);

const get = (username) => {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
            if (response.statusCode === 200) {


                let body = '';
                // console.log(response.statusCode);
                response.on('data', (data) => {
                    body += data.toString();
                })

                response.on('end', () => {
                    try {
                        const profile = JSON.parse(body);
                        // console.dir(profile);
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        })

        // request.on('error', printError);
        request.on('error', (error) => {
            printError(`Error with request ${error}`);
        })
    } catch (error) {
        printError(error);
    }
}


module.exports.get = get;