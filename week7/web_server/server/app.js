var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');
var auth = require('./routes/auth');
//var cors = require('cors')

var index = require('./routes/index');
var news = require('./routes/news');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, '../client/build'));
app.set('view engine', 'jade');

//connect to mongoDB
var config = require('./config/config.json');
require('./models/main').connect(config.mongoDbUri);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//app.use(cors()); for cross origin access

app.use('/static' ,express.static(path.join(__dirname, '../client/build/static/')));


app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLogininStrategy = require('./passport/login_passport');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLogininStrategy);


// pass the authenticaion checker middleware; before display the news, check token
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);
app.use('/', index);
app.use('/news', news);
app.user('/auth', auth);


// catch 404 and forward to error handler 如果request出错
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not Found')
});


module.exports = app;
