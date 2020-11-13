const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/idevos_test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );
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
    .then(() => devs.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done()); // to allow test to continue after first connection w/o collections //
});