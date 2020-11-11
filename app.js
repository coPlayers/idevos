const express = require('express');
const routes = require('./routes/routes');
const app = express();

// Watch for incoming requests of method GET //
// to the route http://localhost:3050/api //
app.get('/api', (req, res) => {
  res.send({ hi: 'there' })
});

module.exports = app;
