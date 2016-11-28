var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var config = require('./config');
var firebase = require('firebase');
firebase.initializeApp(config);
var db = firebase.database();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages\index.html');
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