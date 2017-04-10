/**
 * Created by Amber on 4/10/17.
 */
const mongoose = require('mongoose');


module.exports.connect = (uri) => {
    mongoose.connect(uri);

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    // load models
    require('./user');
};

//mongodb://localhost/tap-news-users

