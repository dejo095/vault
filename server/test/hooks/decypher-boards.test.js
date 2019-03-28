const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const decypherBoards = require('../../src/hooks/decypher-boards');

describe('\'decypher-boards\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: decypherBoards()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
