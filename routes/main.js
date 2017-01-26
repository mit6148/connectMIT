var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var User = require('../models/userModel');


router.get('/connections', function(req, res) {
	User.findOne({email: req.session.email}, function(err, user) {
		if (err) console.log(err);
		res.send(user.connections.concat(req.session.email));
	});
});

router.get('/', function(req, res){
	if (req.session.email){
		res.render('home', {email: req.session.email});
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
		res.render('search', {email: req.session.email, results: null, searchTerm: 'undefined', yearFilter: 'undefined', courseFilter: 'undefined', activityFilter: 'undefined'});
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/search/:searchTerm/:yearFilter/:courseFilter/:activityFilter', function(req, res){
	if (req.session.email){

		var searchTerm = req.params.searchTerm != 'undefined' ? req.params.searchTerm : '';

		var yearFilter = req.params.yearFilter != 'undefined' ? req.params.yearFilter.split(", ") : undefined;
		yearFilter = yearFilter != undefined ? yearFilter.splice(0, yearFilter.length - 1) : undefined;

		var courseFilter = req.params.courseFilter != 'undefined' ? req.params.courseFilter.split(", ") : undefined;
		courseFilter = courseFilter != undefined ? courseFilter.splice(0, courseFilter.length - 1) : undefined;

		var activityFilter = req.params.activityFilter != 'undefined' ? req.params.activityFilter.split(", ") : undefined;
		activityFilter = activityFilter != undefined ? activityFilter.splice(0, activityFilter.length - 1) : undefined;

		User.find( { $or: [{ email : { $regex: ".*" + searchTerm + ".*" } }, { name : { $regex: ".*" + searchTerm + ".*" } } ] } , function(err, users) {
			if (err) {
				console.log(err);
			}

			var eligible = [];
			for (var i = 0; i < users.length; i++) {
				eligible.push(users[i].email);
			}

			if (yearFilter == undefined && courseFilter == undefined && activityFilter == undefined) {
				res.render('search', {email: req.session.email, results: users, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});

			} else if (yearFilter == undefined && courseFilter == undefined) {
				User.find({ email : { $in : eligible }, activities : { $in : activityFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});

			} else if (yearFilter == undefined && activityFilter == undefined) {
				User.find({ email : { $in : eligible }, course : { $in : courseFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});

			} else if (courseFilter == undefined && activityFilter == undefined) {
				User.find({ email : { $in : eligible }, gradYear : { $in : yearFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});

			} else if (yearFilter == undefined) {
				User.find({ email : { $in : eligible }, activities : { $in : activityFilter }, course : { $in : courseFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});

			} else if (courseFilter == undefined) {
				User.find({ email : { $in : eligible }, activities : { $in : activityFilter }, gradYear : { $in : yearFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});

			} else if (activityFilter == undefined) {
				User.find({ email : { $in : eligible }, gradYear : { $in : yearFilter }, course : { $in : courseFilter } }, function(error, results) {
					res.render('search', {email: req.session.email, results: results, searchTerm: req.params.searchTerm, yearFilter: req.params.yearFilter, courseFilter: req.params.courseFilter, activityFilter: req.params.activityFilter});
				});
			}
		});
	}
	else{
		res.redirect('/');
	}
	
});

// router.get('/settings/', function(req, res){
// 	if (req.session.email){
// 		res.render('settings', {email: req.session.email});
// 	}
// 	else{
// 		res.redirect('/');
// 	}
	
// });

router.get('/explore', function(req, res){
	if (req.session.email){

		// User.findOneRandom(function(err, result){
		// 	if (err){
		// 		console.log(err);
		// 	}else{
		// 		console.log(result.email);

		// 		var names = result.name.split(" ");
		// 		var initials = names[0].charAt(0) + "." + names[names.length - 1].charAt(0) + ".";

		// 		res.render('makeConnections', {email: req.session.email, user: result, initials: initials});
		// 	}
		// 	// if (result.email == req.session.email){

		// 	// }
			
		// });

		User.findOne({email: req.session.email}, function(err, user) {
			if (err) {
				console.log(err);
			}
			User.findRandom({ email: { $nin: user.connections.concat(req.session.email) } }, {}, {}, function(error, result) {
				if (error) {
					console.log(error);
				}
				var names = result[0].name.split(" ");
				var initials = names[0].charAt(0) + "." + names[names.length - 1].charAt(0) + ".";

				res.render('makeConnections', {email: req.session.email, user: result[0], initials: initials});
			});
		});
		
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;