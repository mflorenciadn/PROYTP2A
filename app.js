//SCAFFOLIND

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let inventorsRouter = require('./routes/inventors');
let virusRouter = require('./routes/virus');
let verifytokenRouter = require('./routes/validarToken');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//MIDDLEWARES que trae el scaffolding hecho con express-generator
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


////MIDDLEWARES agregados por cada archivo que se cree dentro de la carpeta routes
app.use('/api/inventors',inventorsRouter); //cuando se ingresa a '/api/inventors', se debe redireccionar al router inventorsRouter
app.use('/api/virus', virusRouter);
app.use('/api/verifyToken', verifytokenRouter);


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
