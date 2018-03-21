var express = require('express');
var userRoute = express.Router();
var userModel = require('../models/user');
var config = require('../config/config');

var jwt = require('jsonwebtoken');

//create routes
//get registered user endpoint
userRoute.get('/register', function (req, res) {
    userModel.getUser(function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});
//Register endpoint
userRoute.post('/register', function (req, res, next) {
    // confirm that user typed password matches
    if (req.body.password !== req.body.passwordConf) {
        res.json({success: false, message: 'Passwords do not match'});
        res.status(400).send();
        return next();
    }
    var newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    };
    userModel.addUser(newUser, function (err) {
        if(err){
            res.json({ success: false, message: 'Username or email already exists!' });
            res.status(401).send();
        } else  {
            res.json({ success: true, message: 'User registered successfully' });
        }
    });
});

//Login endpoint
userRoute.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    userModel.findUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return res.json({ success: false, message: 'user not found' });
        }
        userModel.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 // one hour
                });
                res.status(201).json({
                    success: true, 
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    },
                    token: token
                 });
            } else {
                return res.json({ success: false, message: 'Invalid password' });
            }
        });
    });

});


module.exports = userRoute;