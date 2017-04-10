/**
 * Created by Amber on 4/10/17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {unique: true}
    },
    password: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    //第一个password是我们传进的password，this.password的this指的是我们user schema实例出来具体的一个user.
    bcrypt.compare(password, this.password,callback);
};

UserSchema.pre('save', function saveHook(next) {
    //!!!!!!!!!!!!!!!!!!!
    const user = this;

    // proceed further only if the password is modified or the user is new
    if(!user.isModified('password')) return next();

    //get a salt
    return bcrypt.genSalt((saltError, salt) => {
        if(saltError) {
            return next(saltError)
        }

        //hash the salted password: hash([provided password] + [stored salt]) == [stored hash]
        return bcrypt.hash(user.password, salt,(hashError, hash)=> {
            if(hashError) { return next(hashError)}

            //replace password string with hash value; and store to db.
            user.password = hash;
            return next();
        })
    })
});

module.exports = mongoose.model('User', UserSchema);