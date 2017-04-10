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
    console.log('auth_checker: req', req.headers);

    if(!req.headers.authorization) {
        //The request has not been applied because it lacks valid authentication credentials for the target resource.
        return res.status(401).end()
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('auth_checker: token', token );
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if(err) {return res.status(401).end()}

        const email = decoded.sub;

        return User.findById(email, (userErr, user) => {
            if(userErr || !user) {
                return res.status(401).end();
            }

            return next();
        })
    })
}