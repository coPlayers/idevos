const { doesNotMatch } = require('assert');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

// To avoid getting Mocha declaring twice the Dev model //
const Dev = mongoose.model('dev');

describe('Drivers controller', () => {
  //  Method - Route - Result = REST API it text convention //
  it('POST to /api/devs creates a new dev', (done) => {
    // Check Devs count is incremented on Creation //
    Dev.countDocuments().then(count => {
      request(app)
        .post('/api/devs')
        .send({ email: 'test@test.com' })
        .end(() => {
          Dev.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/devs/:id edits an existing dev', done => {
    // Create a dev, save it, make a PUT request, then check is updated //
    const dev = new Dev({ email: 't@t.com', coding: false });

    dev.save().then(() => {
      request(app)
        .put(`/api/devs/${dev._id}`)
        .send({ coding: true })
        .end(() => {
          Dev.findOne({ email: 't@t.com' })
            .then(dev => {
              assert(dev.coding === true);
              done();
            });
        });
    });
  });

  it('DELETE to /api/devs/id can delete a dev', done => {
    // Create Dev, save, delete, check Dev is not in the DB //
    const dev = new Dev({ email: 'test@test.com' });

    dev.save().then(() => {
      request(app)
        .delete(`/api/devs/${dev._id}`)
        .end(() => {
          Dev.findOne({ email: 'test@test.com' })
            .then((dev) => {
              assert(dev === null);
              done();
            });
        });
    });
  });

  it('GET to /api/devs finds devs in a location', done => {
    // Create 2 devs with diff lng, lat and query to see which we get back //
    const seattleDev = new Dev({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDev = new Dev({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    // Use Promise.all() to save the 2 devs in parallel //
    Promise.all([seattleDev.save(), miamiDev.save()])
      .then(() => {
        request(app)
          .get('/api/devs?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].email === 'miami@test.com');
            done();
          });
      });
  });

});
