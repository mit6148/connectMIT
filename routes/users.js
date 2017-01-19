var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');


var Users = require('../models/userModel');

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

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: 'Invalid username or password'})
);

module.exports = router;