const express = require('express');
const app = express();
const db = require('./db.js');
const port = 3000;

// database is automatically seeded when server starts up

app.get('/', (req, res) => {
  // not implemented atm
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});