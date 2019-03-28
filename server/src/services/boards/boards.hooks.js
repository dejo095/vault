const { authenticate } = require('@feathersjs/authentication').hooks;

const processBoards = require('../../hooks/process-boards');

const decypherBoards = require('../../hooks/decypher-boards');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processBoards()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [decypherBoards()],
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
