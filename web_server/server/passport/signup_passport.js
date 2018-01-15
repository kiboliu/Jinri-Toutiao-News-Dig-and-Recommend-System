const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    //match the front-end passing data
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password
    };
    //try to save a user, if failed, log error
    const newUser = new User(userData);
    newUser.save((err) => {
        console.log("Save new user!");
        if (err) {
            return done(err);
        }
        return done(null);
    });
});