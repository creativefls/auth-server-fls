var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
var expressHbs = require('express-handlebars');
var cors = require('cors');

require('dotenv').config();

const config = require('./config')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

var app = express();

// koneksi mongo
let mongoUrl = process.env.MONGO_STRING || 'mongodb://localhost:27017/akufls'

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('mongo connected', mongoUrl)
  }
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(cors({origin: config.allowedOrigin}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route
app.use('/ping', function (req, res) {
  res.json('pong')
})
app.use('/', indexRouter);
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
