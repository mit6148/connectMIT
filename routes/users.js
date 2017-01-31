var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var request = require('request');
var nev = require('email-verification')(mongoose);
var nodemailer = require('nodemailer');
var utils = require('../utils/utils');


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
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
});

//passport.js
passport.use(new LocalStrategy({
    usernameField: 'username',
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
            console.log(message);
            return done(err);
        }

        if (!user) {
            message = "Username or password is incorrect."
            // req.flash('error', message);
            console.log(message);
            return done(null, false);
        }
        if (user.password == password){
            return done(null, user);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            message = "Username or password is incorrect."
            console.log(message);
            return done(null, false);
        }
        return done(null, user);
        });
    });
}));

//email verification 
nev.configure({
    verificationURL: 'http://connect-mit.herokuapp.com/users/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'rendezvous_tempusers',

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'donotreplyconnectmit@gmail.com',
            pass: 'hannahisanalrightperson'
        }
    }
}, function(error, options) {});

router.post('/register', function(req, res){
    var user = req.body;
    var password = hashPassword(user.password);
    var course = user.course.split(',');
    var activities = user.activities.split(', ');
    activities = activities.splice(0, activities.length - 1);

    User.create({
        email: user.email,
        password: password,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gradYear: user.gradYear,
        workLoc: user.workLoc,
        workPosition: user.workPosition,
        course: course,
        activities: activities
    }, function(err, user){
        if (err){
            res.send({
                error: true
            });
        }
        else{
            res.send({
                success: true
            });
        }
    });
});

router.get('/registrationSuccess', function(req, res){
    res.render('registrationSuccess');
});

router.get('/passwordEmail', function(req, res){
    res.render('passwordEmail');
});

router.get('/passwordChanged', function(req, res){
    res.render('passwordChanged');
});

router.get('/forgotPassword', function(req, res){
    res.render('forgotPassword');
});

router.post('/forgotPassword', function(req, res){
    var email = req.body.email;
    var mailOptions = {
        from: '"connectMIT" <donotreplyconnectmit@gmail.com>',
        to: email,
        subject: 'Reset your connectMIT Password', // Subject line
        html: 'Click the following link to reset your connectMIT password:</p><p>http://connect-mit.herokuapp.com/users/resetPassword/' + req.body.email + '</p>' // html body
    };

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) console.log(err);
        if (user == null) {
            res.send("no such user");
        } else {
            utils.transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    return;
                }
            });
            res.send('success');
        }
    });
});

router.get('/resetPassword/:email', function(req, res) {
    res.render('resetPassword', {email: req.params.email});
});

router.post('/resetPassword/:email', function(req, res) {
    User.findOne({
        email: req.params.email
    }, function(err, user){
        if (err) console.log(err);
        else{
            var password = req.body.password;
            password = hashPassword(password);
            user.changePassword(password);
            user.save();
            res.render('passwordChanged');
        }      
    });
});

router.get('/register', function(req, res){
    res.render('registration');
});

router.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return next(err); 
            }
            if (!user) { 
                console.log("no user")
                res.send({
                    error: true
                });
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); 
                }
                req.session.email = user.email;
                res.send({
                    success: true
                });
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
            var activities = req.body.activities.split(",");
            if (!(req.body.activities != '' && activities.length == 1)) {
                activities = activities.splice(0, activities.length - 1);
            }
            user.editInfo(req.body.course.split(','), req.body.phoneNumber, req.body.address, req.body.gradYear, req.body.workLoc, req.body.workPosition, activities);
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

router.put('/change-password/:email', function(req, res){
    User.findOne({
        email: req.params.email
    }, function(err, user){
        if (err) console.log(err);
        else{
            var password = req.body.password;
            password = hashPassword(password);
            user.changePassword(password);
            user.save();
            res.send({
                success: true
            })
        }      
    });
})

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