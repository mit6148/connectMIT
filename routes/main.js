var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res){
	res.render('connections');
});

router.get('/my-connections', function(req, res){
	res.render('connections');
});

router.get('/search', function(req, res){
	res.render('search');
});

router.get('/settings', function(req, res){
	res.render('settings');
});



module.exports = router;