var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var http = require('http');
var cors = require('cors');

mongoose.connect('mongodb://user:user@ds143071.mlab.com:43071/bittiger');


app.set('views', path.join(__dirname, '../ed-client/build'));
app.set('view engine', 'jade');

app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../ed-client/build/static')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/', indexRouter);
app.use('/api/v1',restRouter);

/*
restRouterapp.use(function(req, res) {
    // send index.html to start client side
    res.sendFile("index.html", { root: path.join(__dirname, '../ed-client/public/') });
});*/


var server = http.createServer(app);
// io.attach(server);
server.listen(4000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error){
    throw error;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr == 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
