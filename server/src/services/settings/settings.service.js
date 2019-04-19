// Initializes the `settings` service on path `/settings`
const createService = require('feathers-mongoose');
const createModel = require('../../models/settings.model');
const hooks = require('./settings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/settings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('settings');

  service.hooks(hooks);
};
