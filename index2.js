const https = require('https');

// to print message to console
const printMessage = (username, badgeCount, points) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} in JS.`;
    console.log(message);
}

printMessage('hmiu', 100, 300923);

const getProfile = (username) =>{

    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
        let body = '';
        // console.log(response.statusCode);
        response.on('data', (data) =>{
        body += data.toString();
        })

        response.on('end', ()=> {
            const profile = JSON.parse(body);
            // console.dir(profile);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
    })
}

// const users = ['haileemiu2', 'chalkers'];

// users.forEach(username => {
//     getProfile(username);
// })

// OR...
// console.log(process.argv);
const users = process.argv.slice(2);