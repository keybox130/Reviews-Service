const express = require('express');
const app = express();
const db = require('./db.js');
const path = require('path');
const port = 3000;

// send app and js bundle
app.use(express.static(__dirname + '/../../client/dist'));

// return a stay matching the provided roomId
app.get('/stays/:id', (req, res) => {
  const roomId = req.params.id.slice(1);
  db.Room.find({room_id: roomId}).exec()
  .then(room => {
    res.status(200).send(room[0]);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});