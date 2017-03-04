var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser())
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
  res.send('Up and running!')
})

app.post('/sms', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse(); //declare new Twilio response
    console.log(req.cookies.counter); // Print current cookies to console as check
    console.log(req.cookies.myName);
    console.log(req.cookies.otherName);
    console.log(req.cookies.workTask);
    console.log(req.cookies.nHours);
    var counter = parseInt(req.cookies.counter) || 0;
 // Declare variables to store input, recall from cookies 
    var myName = req.cookies.myName;
    var otherName = req.cookies.otherName;
    var workTask = req.cookies.workTask;
    var nHours = parseInt(req.cookies.nHours);

    if (counter == 0) {
        twiml.message("Welcome to ShareFund. Start a new transaction. What is your username?");
    } else if (req.body.Body == 'Clear') {
    	counter = -1;
    	twiml.message("Transaction cleared. Type anything to begin a new transaction.");
    	console.log("cleared");
    } else if (counter == 1) {
        myName = req.body.Body;
        console.log(myName);
        twiml.message("Hello " + myName + ". What is the username of the person you helped?");
    } else if (counter == 2) {   
    	 otherName = req.body.Body;
    	 console.log(otherName);
    	 twiml.message("How many ShareCredits does " + otherName + " owe you for your work?");
    } else if (counter == 3) {
    	nHours = req.body.Body;
    	console.log(nHours);
    	twiml.message("You are requesting " + nHours + " ShareCredits from  " + otherName + ". What did you provide? (Eg: Cooking, cleaning, translating)");
    } else if (counter == 4){
    	workTask = req.body.Body;
    	console.log(workTask);
    	twiml.message("You have requested " + nHours + " ShareCredits from " + otherName + " for " + workTask + ". Please respond YES to confirm.");
    } else if (counter == 5) {
    	if (req.body.Body.toLowerCase() == 'yes') {
    		console.log("Task confirmed. Done!");
    		twiml.message("Transaction confirmed. An SMS has been sent to " + otherName + " to verify. Once verified, you will receive" + nHours + " ShareCredits. Thank you!");
    	}
    	else {
    		console.log("Task not confirmed.");
    		twiml.message("You did not confirm the task. Please re-input task details.");
    		counter = -1;
    	}
    } else {
        twiml.message("Welcome to ShareFund. Your most recent transaction was " + workTask + " for " + otherName + ". Type 'Clear' to start a new transaction.");
        console.log('most recent transaction displayed')
    }
      counter = counter + 1; //Move to next interaction
      // Assign values stored to cookies
    res.cookie('counter',counter);
    res.cookie('myName', myName);
    res.cookie('otherName', otherName);
    res.cookie('workTask', workTask);
    res.cookie('nHours', nHours);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


http.createServer(app).listen(port, function () {
    console.log("Express server listening on port" + port);
});