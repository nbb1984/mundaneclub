var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var axios = require("axios");
var path = require("path");


// Register User 
router.post('/registerUser', function(req, res) {
    
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    User.getUserByEmail(email, function(err, user) {
        if (err) throw err;
        if (user) {
            return res.json([{ param: 'email', msg: 'Email already exists' }]);
        } else {

            // Validation
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();            
            req.checkBody('password', 'Password must be at least six characters and must not contain any special characters and must contain at least one number, one capital letter, and one lower case letter').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

            var errors = req.validationErrors();

            if (errors) {
                res.json(errors);


            } else {
                var newUser = new User({
                    email: email,
                    password: password
                });

                User.createUser(newUser, function(err, user) {
                    if (err) throw err;
                })

                req.flash('success_msg', 'You are registered and can now login');
                res.status(200);
                res.redirect('/login?success');

            }
        }
    });
});


passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log("user not found");
                return done(null, false, { message: 'User not found' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) {
                    console.log("error here");
                    throw err;
                }

                if (isMatch) {
                    console.log("It looks like we have a match!!!")
                    return done(null, user);
                } else {
                    console.log("no match!!!!!!");
                    return done(null, false, { message: 'Unknown Password' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.get('/api/user', function(req, res) {
    console.log(req.user);
    res.json(req.user);
});

router.post('/loginUser',
    passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/login?error', failureFlash: true }),
    function(req, res) {
        res.redirect("/user" + req.user.email);
    });

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/login');
});

module.exports = router;