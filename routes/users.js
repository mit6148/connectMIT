var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

var User = require('../models/userModel');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(email, password, done) {
  process.nextTick(function() {
    User.findOne({
      'email': email, 
    }, function(err, user) {
        console.log(err);
        console.log(user);
      if (err) {
        console.log(err);
        return done(err);
      }

      if (!user) {
        console.log("no user");
        return done(null, false);
      }

      if (user.password != password) {
        console.log("wrong password");
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));

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
    passport.authenticate('local', { successRedirect: '/connections',
                                   failureRedirect: '/lskdj'
                                   // failureFlash: 'Invalid username or password'
                               })
);

module.exports = router;