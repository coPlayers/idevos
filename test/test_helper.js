const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/idevos_test');
  
});