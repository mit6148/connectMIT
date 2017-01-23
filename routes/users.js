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
        //delete this
        if (user.password == password){
            return done(null, user);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            message = "Username or password is incorrect."
            console.log(err);
            return done(null, false);
        }
        return done(null, user);
        });
    });
}));

router.post('/register', function(req, res){
    var user = req.body;
    var majors = user.selectedCourses.split(',');
    var password = hashPassword(user.password);
    var name;
        if (req.body.middle === "") {
            name = req.body.first + " " + req.body.last;
        } else {
            name = req.body.first + " " + req.body.middle + " " + req.body.last;
        }
    var phoneNumber = user.phoneNumber;
    var address;
    address = user.street + " " + user.city;
    if (user.state != ""){
        address += ", " + user.state;
    }
    if (user.zip != ""){
        address += " " + user.zip;
    }
    address += " " + user.country;
    var gradYear = user.gradYear;
    var workLoc = user.work;
    var workPosition = user.position;
    User.create({
        email: user.email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        gradYear: gradYear,
        workLoc: workLoc,
        workPosition: workPosition,
        course: majors
    }, function(err, user){
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});

router.get('/forgotPassword', function(req, res){
    res.render('forgotPassword');
});

router.get('/register', function(req, res){
    res.render('registration');
});

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

router.get('/settings/:email', function(req, res){
    if (req.session.email){
        User.findOne({
            email: req.params.email
        }, function(err, user) {
            if (err) {
                console.log(err);
                return;
            } else if (user === null) {
                // res.status(404).render('errorPage', { title : '404: Page Not Found' });
                return;
            } else {
                res.render('settings', {
                    user: user
                });
            }
        }); 
    }
    else{
        res.redirect('/');
    }  
});

router.get('/edit-profile/:email', function(req, res) {
    if (req.session.email !== req.params.email) {
        res.redirect('/main');
    } else {
        User.findOne({
            email: req.params.email
        }, function(err, user) {
            if (err) {
                console.log(err);
                return;
            } else if (user === null) {
                // res.status(404).render('errorPage', { title : '404: Page Not Found' });
                return;
            } else {
                res.render('editableProfile', {
                    user: user
                });
            }
        });
    }
});

module.exports = router;