//index.js is most likely the entry point for requiring a module.
var express = require('express'); // a module which is usually referred as main function in the code.;checks package.json
var path = require('path'); // path module to work with files and directories.
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var index = require('./routes/index');
var favorites = require('./routes/favorites');

var app = express(); // creating a new express object- in this case, a new application; app main-entry

// view engine setup- tells hbs engine to render hbs files.
app.engine('.hbs', hbs({
  extname:'.hbs',
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('views', path.join(__dirname, 'views')); // tells express which template to use
app.set('view engine', 'hbs'); //// tells express which template to use

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use is to configure middleware used by the routes of the Express HTTP server object.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure sessions, and session storage in MongoDB
var mongo_pw = process.env.MONGO_PW;
var url = 'mongodb://chitrakakkar:' + mongo_pw + '@localhost:27017/helloSessions?authSource=admin';

var store = new MongoDBStore({
    uri : url,
    collection : 'sessions'
}, function(error) {
    // todo deal with error connection
    if (error) console.log(error)
});

app.use(session({
    secret: "put a random string here",
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/', index);
app.use('/favorites', favorites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// exposing the router variable globally to be used into different files.

//about procfile:- Procfile is a mechanism for declaring what commands are run by your application's dynos on the Heroku platform.
// Procfile to tell Heroku how to run various pieces of your app.
// Package.JSon is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.