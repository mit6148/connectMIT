var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var request = require('request');


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
            // req.flash('error', message);
            return done(err);
        }

        if (!user) {
            message = "Username or password is incorrect."
            // req.flash('error', message);
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
    var address = user.address;
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
            res.redirect('/users/registrationSuccess');
        }
    });
});

router.get('/registrationSuccess', function(req, res){
    res.render('registrationSuccess');
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
                console.log("user is null");
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

router.put('/edit-profile/:email', function(req, res){
    User.findOne({
        email: req.session.email
    }, function(err, user){
        if (err){
            console.log(err);
        } else{
            user.editInfo(req.body.course.split(','), req.body.phoneNumber, req.body.address, req.body.gradYear, req.body.workLoc, req.body.workPosition);
            user.save();
            res.send({
                success: true
            });
        }
    });
});

router.put('/connect/:email', function(req, res){
    User.findOne({
        email: req.session.email
    }, function(err, currentUser){
        if (err){
            console.log(err);
            return;
        } else if (currentUser === null){
            console.log("no current user");
        } else{
            var connectionEmail = req.params.email;
            User.findOne({
                email: connectionEmail
            }, function(error, user){
                if (error){
                    console.log(error);
                } else{
                    currentUser.addConnection(user.email);
                    currentUser.save();
                    res.send({
                        success: true
                    });
                }
            });
        }
    });
});

router.put('/disconnect/:email', function(req, res){
    User.findOne({email: req.session.email}, function(err, user) {
        if (err) console.log(err);
        user.removeConnection(req.params.email);
        user.save();
        res.send({
            success: true
        })
    });
});

router.get('/user-location', function(req, res){
    if (req.session.email){
        User.findOne({
            email: req.session.email
        }, function(err, user){
            if (err){
                console.log(err);
            } else{
                var address = user.address;
                address = address.split(' ').join('+');
                request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBWmIQ1b3Uoj8FrHF14lTo9VDs2CADz9wY', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    var lat = body.results[0].geometry.location.lat;
                    var lng = body.results[0].geometry.location.lng;
                    res.send({
                        lat: lat,
                        lng: lng
                    });
                } else {
                    console.log("address is invalid");
                    return;
                }
            });
            }
        });
    }
    else{
        console.log("no user logged in");
    }
});

router.get('/connections-locations', function(req, res){
    if (req.session.email){
        User.findOne({
            email: req.session.email
        }, function(err, user){
            if (err){
                console.log(err);
            } else{

                var connections = user.connections;
                User.find(
                    {"email": {$in: user.connections}
                }, function(error, myConnections){
                    if (error){
                        console.log("can't find connections");
                    } else{
                        var coords = [];
                        myConnections.forEach(function(connection){
                            var address = connection.address;
                            coords.push([address, connection.name, connection.email]);

                        }); //end for each loop
                        res.send({
                            addresses: coords
                        });
                    }
                }); //end User.find

                
            }
        }); //end User.findOne
    }
    else{
        console.log("no user logged in");
    }
});

router.get('/viewProfile/:email', function(req, res){
    User.findOne({email: req.params.email}, function(err, user) {
        if (err) console.log(err);
        res.render('viewProfile', {user: user, email: req.session.email});
    });
});

module.exports = router;