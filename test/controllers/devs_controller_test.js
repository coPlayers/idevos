const { doesNotMatch } = require('assert');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Drivers controller', () => {
  //  Method - Route - Result = REST API it text convention //
  it('Post to /api/devs creates a new dev', (done) => {
    request(app)
      .post('/api/devs')
      .send({ email: 'test@test.com' })
      .end(() => {
        done();
      });
  });
});
