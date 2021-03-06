const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const populateSettings = require('../../hooks/populate-settings');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), hooks.restrictToOwner({ ownerField: '_id' }) ],
    get: [ authenticate('jwt'), hooks.restrictToOwner({ ownerField: '_id' })],
    create: [ hashPassword() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      protect('password')
    ],
    find: [],
    get: [],
    create: [ populateSettings() ],
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
