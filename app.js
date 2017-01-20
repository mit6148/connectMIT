var express = require('express');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var home = require('./routes/home');



/********************************************************************
* App Setup 
*********************************************************************/
var app = express();

app.use(bodyParser.json());
// app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public/html'));
app.use(bodyParser.urlencoded({
    extended: false
  }));

app.set('view engine', 'jade');
app.set('views', __dirname + '/public/html');
var port = process.env.PORT || 3000;

/********************************************************************
* Database Setup
*********************************************************************/
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/6148db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('database connected');
});

app.use('/users', users);
app.use('/home', home);


/**
* Has app listen on correct port 
*/
app.listen(port, function() {
  console.log('Listening on port ' + port);
});

module.exports = app;