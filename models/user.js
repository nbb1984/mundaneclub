var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByEmail = function(email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
    console.log(callback);
};

module.exports.comparePassword = function(candidatePassword, hash, cb) {
    console.log("compare password running");
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};