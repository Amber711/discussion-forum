/**
 * Created by Amber on 4/10/17.
 */
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config.json');

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
 const userData = {
     email: email.trim(),
     password: password.trim()
 };

 //find a user by email address

    return User.findOne({email: userData.email}, (err, user) => {
        if(err) {return done(err);}
//user doesn't exist
        if(!user) {
            const error = new Error("incorrect email or password");
            error.name = 'IncorrectCredentialsError';

            return done(error)
        }
//if email exists, check password

        // check if a hashed user's password is equal to a value saved in the database
        //comparePassword已经绑定在User schema中，所以调用这个方法应该直接使用23行返的user去调用即可。
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if(passwordErr) {return done(passwordErr)}

            if(!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }
            //if passwords match
            const payload = {
                sub: user._id
            };

            //create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.email
            };
            console.log('login passport token',token);
            return done(null, token, data);

        })

    })
})