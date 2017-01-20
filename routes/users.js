var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

var User = require('../models/userModel');

var hashPassword = function(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
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
        var message;
        if (err) {
            message = "Login failed. Please try again."
            req.flash('error', message);
            return done(err);
        }

        if (!user) {
            message = "Username or password is incorrect."
            req.flash('error', message);
            return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            message = "Username or password is incorrect."
            req.flash('error', message);
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
    res.render('registration');
});

// router.post('/login',
//     passport.authenticate('local', { successRedirect: '/main',
//                                    failureRedirect: '/'
//                                    // failureFlash: 'Invalid username or password'
//                                })
// );

router.get('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return next(err); 
            }
            if (!user) { 
                return res.redirect('/'); 
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); 
                }
                req.session.email = user.email;
                return res.redirect('/main');
            });
    })(req, res, next);
});

router.get('/logout', function(req,res){
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

module.exports = router;