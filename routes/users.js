var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

router.use(passport.initialize());
router.use(passport.session());

var User = require('../models/userModel');

var hashPassword = function(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(username, password, done) {
      process.nextTick(function() {
        User.findOne({
          'email': username, 
      }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
        });
    });
}));

router.post('/register', function(req, res){
    var user = req.body;
    var password = hashPassword(user.password);
    User.create({
        email: user.email,
        password: password
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
    res.render('connections');
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/main',
                                   failureRedirect: '/'
                                   // failureFlash: 'Invalid username or password'
                               })
);

module.exports = router;