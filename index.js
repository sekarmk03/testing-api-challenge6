var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/index.js');
// console.log(router);
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', (req, res, next) => {
    return res.status(200).json({
        status: true,
        message: 'hello world',
    });
});

app.use('/', router);
// app.use('/users', usersRouter);

module.exports = app;
