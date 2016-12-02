var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser())

// Declare variables to store user input
var myName;
var otherName;
var workTask;
var nHours;

app.post('/sms', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    console.log(req.cookies.counter);
    var counter = parseInt(req.cookies.counter) || 0;

    if (counter == 0) {
        twiml.message("Welcome to TimeFund. What is your name?");
    } else if (req.body.Body == 'done') {
    	counter = -1;
    	twiml.message("Number count restarted.");
    } else if (counter == 1) {
    	console.log(req.body.Body);
        myName = req.body.Body;
        console.log(myName);
        twiml.message("Hello " + myName + ". What is the username of the person you helped?");
    } else if (counter == 2) {   
    	 console.log(req.body.Body);
    	 otherName = req.body.Body;
    	 console.log(otherName);
    	 twiml.message("How many hours of work did you do for " + otherName + "?");
    } else if (counter == 3) {
    	console.log(req.body.Body);
    	nHours = req.body.Body;
    	console.log(nHours);
    	twiml.message("You did " + nHours + " hours of work for " + otherName + ". What task did you do?");
    } else if (counter == 4){
    	console.log(req.body.Body);
    	workTask = req.body.Body;
    	console.log(workTask);
    	twiml.message("You completed task: " + workTask);
    } else {
        twiml.message("Placeholder. This is message " + counter);
    }
      counter = counter + 1;
    res.cookie('counter',counter);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337");
});