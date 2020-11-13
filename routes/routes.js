const DevsController = require('../controllers/devs_controller.js');

module.exports = (app) => {
  // Watch for incoming requests of method GET //
  // to the route http://localhost:3050/api //
  app.get('/api', DevsController.greeting);

  app.post('/api/devs', DevsController.create);
  app.put('/api/devs/:id', DevsController.edit);
  app.delete('/api/devs/:id', DevsController.delete);
  app.get('/api/devs', DevsController.index);
};