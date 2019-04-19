const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ hooks.restrictToOwner({ ownerField: 'userId' }) ],
    get: [ hooks.restrictToOwner({ ownerField: 'userId' }) ],
    create: [ hooks.associateCurrentUser({ as: 'userId' }) ],
    update: [ hooks.associateCurrentUser({ as: 'userId' }) ],
    patch: [ hooks.associateCurrentUser({ as: 'userId' }) ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
