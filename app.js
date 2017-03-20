var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

const routes = [
  {
    name: '5',
    slug: 'bus-5'
  },
  {
    name: '26',
    slug: 'bus-26'
  },
  {
    name: '15э',
    slug: 'bus-15e'
  }
];

app.get('/nearest-bus-stop', (req, res) => {
  res.json({
    name: 'Парк Жилибера',
    routes: routes,
  });
});

app.get('/routes/:slug', (req, res) => {
  const slug = req.params.slug;
  const route = routes.find((r) => r.slug === slug);

  res.json(Object.assign(
    {},
    route,
    { path: 'to-be-designed' }
  ));
});

/*

/nearest-bus-stop?lat=:lat&long=:long
/routes/:slug

*/

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
