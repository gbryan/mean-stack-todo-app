
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http');
var database = require('./config/db');

// Database Connection
mongoose.connect(database.path);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('DB connection successful!');
});


// all environments
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
require('./routes')(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
