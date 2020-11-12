const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/idevos');

app.use(bodyParser.json());
routes(app);  // after app.use(bodyParser) //

module.exports = app;
