const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const processBoards = require('../../hooks/process-boards');
const decypherBoards = require('../../hooks/decypher-boards');
const decypherCreatedBoards = require('../../hooks/decypher-created-boards');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ hooks.restrictToOwner({ ownerField: 'ownerId' }) ],
    get: [ hooks.restrictToOwner({ ownerField: 'ownerId' }) ],
    create: [ 
      hooks.associateCurrentUser({ as: 'ownerId' }),
      processBoards()
     ],
    update: [ hooks.restrictToOwner({ ownerField: 'ownerId' }) ],
    patch: [ hooks.restrictToOwner({ ownerField: 'ownerId' }) ],
    remove: [ hooks.restrictToOwner({ ownerField: 'ownerId' }) ]
  },

  after: {
    all: [],
    find: [ decypherBoards() ],
    get: [ ],
    create: [ decypherCreatedBoards() ],
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
