var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var User = require('../models/userModel');

router.get('/', function(req, res){
	if (req.session.email){
		// res.render('connections', {email: req.session.email});
		User.findOne({
			email: req.session.email
		}, function(err, user){
			if (err){
				console.log(err);
			} else{
				User.find({"email": {$in: user.connections}}, function(error, myConnections){
					if (error){
						console.log(error);
					} else{
						var connectArray = [];
						for (var i = 0; i < myConnections.length; i+=3) {
							var temp = myConnections.slice(i, i + 3);
							if (temp.length < 3) {
								var filler = new Array(3 - temp.length).fill(null);
								temp = temp.concat(filler);
							}
							connectArray.push(temp);
						}
						res.render('connections', {email: req.session.email, connections: connectArray});
					}
				});	
			}
		});
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/my-connections', function(req, res){
	if (req.session.email){
		User.findOne({
			email: req.session.email
		}, function(err, user){
			if (err){
				console.log(err);
			} else{
				User.find({"email": {$in: user.connections}}, function(error, myConnections){
					if (error){
						console.log(error);
					} else{
						var connectArray = [];
						for (var i = 0; i < myConnections.length; i+=3) {
							var temp = myConnections.slice(i, i + 3);
							if (temp.length < 3) {
								var filler = new Array(3 - temp.length).fill(null);
								temp = temp.concat(filler);
							}
							connectArray.push(temp);
						}
						res.render('connections', {email: req.session.email, connections: connectArray});
					}
				});	
			}
		});
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/search', function(req, res){
	if (req.session.email){
		res.render('search', {email: req.session.email});
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/settings', function(req, res){
	if (req.session.email){
		res.render('settings', {email: req.session.email});
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/explore', function(req, res){
	if (req.session.email){
		User.findOneRandom(function(err, result){
			if (err){
				console.log(err);
			}else{
				var names = result.name.split(" ");
				var initials = names[0].charAt(0) + "." + names[names.length - 1].charAt(0) + ".";

				res.render('makeConnections', {email: req.session.email, user: result, initials: initials});
			}
			// if (result.email == req.session.email){

			// }
			
		});
		
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;