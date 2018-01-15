//check token when load news
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

//middleware: get req, return res, pass next
module.exports = (req, res, next) => {
    console.log('auth_checker: req: ' + req.headers);
    
    // check if token included
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the latest part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];
   
    console.log('auth_checker: token: '+token);

    // decode the token using a secret key-phrase and verify if user exists
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end(); }

        const email = decoded.sub;

        //check if a user exists
        return User.findById(email, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            // continue loading news
            return next();
        });
    });
};