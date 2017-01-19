var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');


var User = require('../models/userModel');

router.post('/register', function(req, res){
    var user = req.body;
    User.create({
        email: user.email,
        password: user.password
    }, function(err, user){
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});

router.get('/register', function(req, res){
    res.render('registration');
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/',
                                   failureFlash: 'Invalid username or password'})
);

module.exports = router;