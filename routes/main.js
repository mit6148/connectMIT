var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res){
	if (req.session.email){
		res.render('connections');
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/my-connections', function(req, res){
	if (req.session.email){
		res.render('connections');
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/search', function(req, res){
	if (req.session.email){
		res.render('search');
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/settings', function(req, res){
	if (req.session.email){
		res.render('settings');
	}
	else{
		res.redirect('/');
	}
	
});

router.get('/explore', function(req, res){
	if (req.session.email){
		res.render('makeConnections');
	}
	else{
		res.redirect('/');
	}
	
});

module.exports = router;