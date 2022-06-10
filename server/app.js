var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session")
var MysqlStore = require("express-mysql-session")(session)
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'itc801',
  database: 'board'
};
var sessionStore = new MysqlStore(options)


const { Sequelize } = require('sequelize');
global.sequelize = new Sequelize('board', 'root', 'itc801', {
  host: 'localhost',
  dialect: "mysql",
  logging: false
});

require("./model.js")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require("./routes/board");

var app = express();

app.use(session({
  key: 'session_key',
  secret: 'wegsxhrxvcbxnb',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

console.log(path.join(__dirname, "../client/dist"))
console.log(__filename)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/board", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
