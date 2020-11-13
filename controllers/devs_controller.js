const Dev = require('../models/dev');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    // eg: http://google.com?lng=80&lat=20 //
    const { lng, lat } = req.query;  

    Dev.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]  // expect lng and lat to come from the req //
          },
          maxDistance: 200000,    // units = meters //
          spherical: true,
          distanceField: "dist.calculated"
        }
      }
    ])
    .then(devs => res.send(devs))
    .catch(next);
  },

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
  },

  delete(req, res, next) {
    const devId = req.params.id;
    const devProps = req.body;

    Dev.findByIdAndRemove({ _id: devId })
      .then(dev => res.status(204).send(dev)) // 204 - Successfully deleted //
      .catch(next);
  }
};