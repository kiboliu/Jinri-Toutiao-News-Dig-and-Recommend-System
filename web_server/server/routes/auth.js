const express = require('express');
const passport = require('passport');
const router = express.Router();
const validator = require('validator');

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        console.log('validationResult failed');
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local-signup', (err) => {
        console.log("passport");
        if (err) {
            console.log("error is " + err);
            if (err.name === 'MongoError' && err.code === 11000) {
                // translate the mongo internal duplication error
                // the 11000 mongo code is for a duplication email error
                // the 409 http status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: "check the form for errors",
                    errors: {
                        email: "This email is already used."
                    }
                });
            }
            // other errors
            return res.status(400).json({
                success: false,
                message: "Could not process the form."
            });
        }
        return res.status(200).json({
            success: true,
            message: "You have successfully signed up! Now you can log in"
        });
    }) (req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        console.log('validationResult failed');
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            console.log(err);
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            // other errors
            return res.status(400).json({
                success: false,
                message: "Could not process the form." + err.message
            });
        }

        return res.json({
            success: true,
            message: "You have successfully logged in!",
            token,
            user: userData
        });
    }) (req, res, next);
});

function validateSignupForm(payload) {
    console.log(payload);
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.length < 8) {
        isFormValid = false;
        errors.email = 'Password must have at least 8 characters.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};

function validateLoginForm(payload) {
    console.log(payload);
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim() === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.length < 8) {
        isFormValid = false;
        errors.email = 'Password must have at least 8 characters.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};

module.exports = router;