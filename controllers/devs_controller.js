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
    const devId = req.params.id;
    const devProps = req.body;

    Dev.findByIdAndUpdate({ _id: devId }, devProps )
      .then(() => Dev.findById({ _id: devId }))
      .then(dev => res.send(dev))
      .catch(next);
  }
};