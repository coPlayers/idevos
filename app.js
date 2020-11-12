const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/idevos');
}  // else if testing - don't connect to db(dev) //
// use the test/test_helper.js to connect to a test db //

app.use(bodyParser.json());
routes(app);  // after app.use(bodyParser) //

module.exports = app;
