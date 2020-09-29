const express = require('express');
const app = express();
const db = require('./db.js');
const path = require('path');
const port = 3000;

// send app and js bundle
app.use(express.static(__dirname + '/../../client/dist'));

// return all stays (remove once endpoints based on stay id implemented)
app.get('/stays', (req, res) => {
  db.Room.find({}).exec()
  .then(docs => {
    res.status(200).send(docs);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});