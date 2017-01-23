var mongoose = require('mongoose');
var fs = require('fs');
var User = require('../models/userModel');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/6148db');

var db = mongoose.connection;
// db.dropCollection("users", function(err){
// 	if (err){
// 		console.log("failed to drop collection");
// 	} else{
// 		console.log("collection cleared");
// 	}
	
// });
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
    console.log('database connected');
    var contents = fs.readFileSync(__dirname + '/../data/bootstrapData.json');
    var obj = JSON.parse(contents);
	// var obj = JSON.parse(fs.readFileSync(__dirname + '/../data/bootstrapData.json', 'utf8'));
	var users = obj.users;
	console.log(users);
	for (var i = 0; i < users.length; i++){
			User.create(users[i], function(err, user){
			if (err){
				console.log(err);
			}
			else{
				console.log("success");
			}
		});
	}
	
	console.log(obj);
});