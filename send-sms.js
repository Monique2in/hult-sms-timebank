// require config file
var config = require('./config.js');

// Twilio Credentials 
var accountSid = config.accountSid;
var authToken = config.authToken;
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({ 
    to: config.toPhone, 
    from: config.fromPhone, 
    body: "Hi there! Welcome to TimeFund.", 
}, function(err, message) { 
    console.log(message.sid); 
});