const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')        // customized statements //
      .end((err, response) => {

      });
  });
});