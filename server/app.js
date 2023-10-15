var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
// Setup express-session
const session = require("express-session");
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login-routes');
const courseRouter = require('./routes/course-routes');
const questionRouter = require('./routes/question-routes');
const examRouter = require('./routes/exam-route');
const divisionRouter = require('./routes/divisions-route');
const tagsRouter = require('./routes/tags-routers');
const universitiesRouter = require('./routes/universities-route');
const teachersRouter = require('./routes/teachers-route');
const { initDataBase } = require('./sql/index');

// init database
const options = initDataBase();

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// static server
app.use('/uploads', express.static('uploads'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "CS719"
}));
app.use(logger('dev'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

[
  indexRouter, 
  usersRouter, 
  loginRouter, 
  courseRouter, 
  questionRouter,
  examRouter,
  divisionRouter,
  tagsRouter,
  universitiesRouter,
  teachersRouter,
].forEach((router) => {
  router.use((req, res, next) => {
    req.options = options;
    next();
  })
  app.use(router)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(`err->`,err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
