const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

routes(app);

module.exports = app;
