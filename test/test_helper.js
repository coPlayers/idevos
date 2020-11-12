const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/idevos_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    });
});

// drop collections before each test //
beforeEach(done => {
  const { devs } = mongoose.connection.collections;
  devs.drop()
    .then(() => done())
    .catch(() => done()); // to allow test to continue after first connection w/o collections //
});