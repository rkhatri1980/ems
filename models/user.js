var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwordConf: { type: String, required: true }
});

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;

//functions
//get user functions
module.exports.getUser = function (callback) {
    User.find(callback);
};

//get user by username functions
module.exports.findUserByUsername = function (username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

//get user by user id functions
module.exports.findUserById = function (id, callback) {
    User.findById(id, callback);
};

//create user functions
module.exports.addUser = function (newUser, callback) {
    // User.create(newUser, callback);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {        
            if(err){ //this gave me error while registering from UI
                res.send(err);
            } else{
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.passwordConf = hash;
            User.create(newUser, callback);
            }
        });
    });
};
/*

*/
// compare hashed and normal password
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, result) {
        // if(err) throw err;
        callback(null, result);
        console.log(null, result);
    });
};

module.exports.authenticateUser= function (req, res, next){
// check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];
    console.log(token);
    if(token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if(err) {
                return res.status(201).json({
                    success: false,
                    message: 'Authenticate token expired, please log in again!',
                    errcode: 'exp-token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'fatal error, authenticate token not available',
            errcode: 'no-token'
        });
    }
};


