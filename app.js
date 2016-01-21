var express = require('express');
var path = require('path');//path - is a core Node module for working with and handling paths.
var favicon = require('serve-favicon');//serve-favicon is Express middleware for serving a favicon
var logger = require('morgan'); //morgan is Express middleware for logging requests and responses.
var cookieParser = require('cookie-parser');//cookie-parser is Express middleware that helps you with handling cookies. Your request object will have a cookies object which you can acces use in your app
var bodyParser = require('body-parser');
//http://code.runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js
/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 */

var routes = require('./routes/index');
var users = require('./routes/users');
var codeFrequencyData = require('./routes/codeFrequencyData');
console.log("code Frequency ");
console.log(codeFrequencyData);
var codeFrequencyGraph = require('./routes/codeFrequencyGraph');


var app = express();
// console.log("Dir name");
// console.log(__dirname);// /vagrant/nodeExpressJade-->Path to this folder from the root
// console.log(path.join(__dirname, 'views'));// It just appends views after the root path and generates a string like this: /vagrant/nodeExpressJade/views

// view engine setup
app.set('views', path.join(__dirname, 'views'));// It tells the app where the views folder lies
app.set('view engine', 'jade');// It directs the app to use jade templating engine

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*This method tells the app to use the parameters you're giving it.
 This can be a function or a path and a function.
The capabilities are beyond the scope of this blog post.
*/


/*logger('dev') logs the requests to the console as seen above.
The dev parameter means it will log a lot of information about the request such as the method,
status code and response time.*/
app.use(logger('dev'));

/*bodyParser.json() gives your app the ability to parse JSON.
This is necessary for when you're sending data (which you probably will with a JavaScript application) in JSON format.*/
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// console.log("___Static");
// console.log(typeof express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function(req,res,next) {
//   console.log("Got req for" + req.url);
//
// });

app.use('/', routes);
app.use('/users', users);
app.use('/codeFrequencyGraph',codeFrequencyGraph);
app.use('/codeFrequencyData', codeFrequencyData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
