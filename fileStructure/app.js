const profile = require('./profile');

// const users = ['haileemiu2', 'chalkers'];
// console.log(process.argv);
const users = process.argv.slice(2);

users.forEach(username => {
    profile.get(username);
})