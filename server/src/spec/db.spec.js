const db = require('../db.js');

describe('Database API', () => {
  test('it should connect to the database', done => {
    db.dbo.once('open', () => {
      try {
        expect(db.dbo.name).toEqual('reviews');
        done();
      }
      catch (error) {
        done(error);
      }
    })
    db.dbo.on('error', () => {
      done(new Error('Could not connect to database.'));
    });
  });
});