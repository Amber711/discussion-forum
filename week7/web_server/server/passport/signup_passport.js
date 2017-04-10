/**
 * Created by Amber on 4/10/17.
 */
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true

}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
    };

    const newUser = new User(userData);
    //无需判断email是否已经存在，因为在user.js UserSchema中我们已经指定email unique
    newUser.save(err => {
        if(err) {
            return done(err);
        }

        return done(null)
    })
});
