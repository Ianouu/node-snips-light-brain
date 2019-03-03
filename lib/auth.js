var auth = require('http-auth');

var basic = auth.basic({
    realm: "auth",
    file: __dirname + "/creds.htpasswd"
});
 
basic.on('success', (result, req) => {
    //console.log(`User authenticated: ${result.user}`);
});
 
basic.on('fail', (result, req) => {
    //console.log(`User authentication failed: ${result.user}`);
});
 
basic.on('error', (error, req) => {
    //console.log(`Authentication error: ${error.code + " - " + error.message}`);
});

module.exports = {
    auth,
    basic
}