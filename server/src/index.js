// App variables
const express = require('express');
const createError = require('http-errors');
const db = require('./database/connector');
const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

// Create app
let app = express();

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Start app
app.listen(process.env.PORT || 3001);

// Get Routers
const accountsRouter = require('./routes/accounts');

// Add Routes
app.use('/accounts', accountsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
