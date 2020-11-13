const Dev = require('../models/dev');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    const devProps = req.body;
    
    Dev.create(devProps)
      .then(dev => res.send(dev))
      .catch(next);
  },

  edit(req, res, next) {
    
  }
};