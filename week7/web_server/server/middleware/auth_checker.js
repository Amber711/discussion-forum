/**
 * Created by Amber on 4/10/17.
 */
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');
/**
 *
 * 1.check if there is a token, yes, get the email from token;
 * 2. check if the email exists
 *
 *
 * @returns {*}
 */

module.exports = (req, res, next) => {
    console.dir('auth_checker: req: ' + req.headers.toString()+JSON.stringify(req.headers));
    console.log('~~~~~~~~~~~~',req.headers);

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.slice(6);
    console.log('-------------------');
    console.log('auth_checker: token: ' + token);

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { console.log('---unauthorized');return res.status(401).end(); }

        const email = decoded.sub;

        // check if a user exists
        return User.findById(email, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }

            return next();
        });
    });
};
