const db = require('../src/db.js');
const express = require('express')

describe('Database API', () => {
  test('it should connect to the database', done => {
    // after the database is open, verify the connection was successful
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