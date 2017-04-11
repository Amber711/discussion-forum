/**
 * Created by Amber on 4/11/17.
 */
const express = require('express');
const passport = require('passport');
const router = express.Router();
const validator = require('validator');

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if(!validationResult.success) {
        console.log('validationResult Failed');
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    //validation success
    return passport.authenticate('local-signup', err => {
        if(err) {
            console.log(err);
            if(err.name =='MongoError' && err.code ===11000) {
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        //already save the user info to db,(user.js)sign up successfully

        return res.status(200).json({
            success:true,
            message:'you have successfully signed up! Now you should be able to log in'
        });
    })(req, res, next);

});

function validateSignupForm(payload) {
    console.log(payload);
    const errors = {};
    let isFormValid = true;
    let message = '';
    if(!payload || typeof payload.email !='string' || !validator.isEmail(payload.email)){
        isFormValid = false;
        errors.email = 'please provide a correct email address';
    }

    if(!payload || typeof payload.password !='string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must be at least 8 characters';
    }

    if(!isFormValid) {
        message = 'check the form for errors';
    }

    return {
        success: isFormValid,
        message,
        errors
    }
};

router.post('/login', (req, res, next) => {

    const validationResult = validateLoginForm(req.body); //check LoginPage.js in client-side
    if(!validationResult.success) {
        console.log('validationResult failed');
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData)=> {
        //err types: 1.passwords don't match; 2.passwordErr from passport.js when comparing pwds.
        console.log('auth.js token', token);
        if(err) {
            console.log('err in login passport:',err);
            if(err.name === 'IncorrectCredentialsError') {
                console.log('IncorrectCredentialsError: ', err.message);
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            };

            return res.status(400).json({
                success: false,
                message: 'Could not process the form: ' +err.message
            })

        }
        return res.json({
            success: true,
            message: "you've successfully logged in!",
            token,
            user: userData
        })

    })(req, res, next);
});

function validateLoginForm(payload) {
    console.log(payload);
    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!payload || typeof payload.email !='string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'please provide your email address';
    };

    if(!payload || typeof payload.password !== 'string' || payload.password.trim().length ===0 ) {
        isFormValid = false;
        errors.password = 'please provide your password.';
    }

    if(!isFormValid) {
        message = 'check the form for errors'; // message == errors.summary in client-side
    }

    return {
        success:isFormValid,
        message,
        errors
    }

}

module.exports = router;