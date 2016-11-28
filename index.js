var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var config = require('./config');

var firebase = require('firebase');
firebase.initializeApp(config.firebase);
var db = firebase.database();

var twilioClient = require('twilio')(
	config.twilio.TWILIO_ACCOUNT_SID, config.twilio.TWILIO_AUTH_TOKEN);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages\index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.get('/helloworld', function(request, response) {
	response.send('hello world');
});

app.get('/firebase', function(request, response) {
	db.ref('/').once('value').then(function(data) {
		response.send(data.val());
	})
});

app.get('/sms/reply', function(request, response) {
	response.set('Content-Type', 'text/plain');
	console.log("request", request.query);
	response.send('Sms received: ' + Date.now());
});

app.get('/sms/test', function(request, response) {
	twilioClient.messages.create({ 
	    to: '+17146565566', 
	    from: config.twilio.TWILIO_PHONE_NUMBER, 
	    body: "Assalamualaikum", 
	}, function(err, message) { 
	    console.log(message.sid); 
	});
	response.send("SMS Sent");
})