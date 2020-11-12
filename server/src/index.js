const express = require('express');
const compression = require('compression');
const db = require('./db.js');
const path = require('path');

const app = express();
const port = 3003;
app.use(compression());

// send app and js bundle
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// return a stay matching the provided roomId
app.get('/reviews/stays/:id', (req, res) => {
  const { id } = req.params;
  db.Room.find({ room_id: id })
    .exec()
    .then((room) => {
      res.status(200).send(room[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
