const { doesNotMatch } = require('assert');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

// To avoid getting Mocha declaring twice the Dev model //
const Dev = mongoose.model('dev');

describe('Drivers controller', () => {
  //  Method - Route - Result = REST API it text convention //
  it('Post to /api/devs creates a new dev', (done) => {
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
});
