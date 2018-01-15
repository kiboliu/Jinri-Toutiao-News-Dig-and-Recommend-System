const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config.json');

module.exports = new PassportLocalStrategy({
    //match the front-end passing data
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    //set to true
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password
    };
    //find a user by emailaddress
    return User.findOne({ email: userData.email },(err, user) => {
        if (err) { return done(err); }
        if (!user) {
            const error = new Error("Incorrect email or password");
            error.name = "IncorrectCredentialsError";
            return done(error);
        }
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (passwordErr) { return done(passwordErr); }
            if (!isMatch) {
                const error = new Error("Incorrect email or password");
                error.name = "IncorrectCredentialsError";
                return done(error);
            }
            const payload = {
                sub:user._id
            };
            //create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.email
            };
            return done(null, token, data);
        });
    });
});