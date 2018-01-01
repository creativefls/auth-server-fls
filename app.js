var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs')

const swaggerUi = require("swagger-ui-express");
// './swagger.json' refers to the api documentation file generated through postman and converted through Apimatic
// it could be named anything else e.g. converted.json or api-docs.json
const swaggerDocument = require('./swagger.json');

require("dotenv").config();

// koneksi mongo
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/akufls");

var web = require('./routes/web');
var api = require('./routes/api');
var auth = require('./routes/auth');

var app = express();

hbs.registerPartials(path.join(__dirname + "/views/partials"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// '/api-docs' refers to the url or route path through which the documentation is to be served
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', web);
app.use('/api', api);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
