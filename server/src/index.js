const express = require('express');
const compression = require('compression');
const db = require('./db/redis');
const path = require('path');
const redis = require('redis').createClient();

const app = express();
const port = 3003;
app.use(compression());

db.load();

// send html, bundles, and fonts/stylesheets
app.use(express.static(path.join(__dirname, '..', '..', 'public/fonts')));
app.use(express.static(path.join(__dirname, '..', '..', 'public/dist')));
app.use(express.static(path.join(__dirname, '..', '..', 'public/db')));

// return a stay matching the provided roomId
app.get('/reviews/stays/:id', (req, res) => {
  const { id } = req.params;
  // db.Room.find({ room_id: id })
  //   .exec()
  //   .then((room) => {
  //     res.status(200).send(room[0]);
  //   })
  //   .catch((err) => {
  //     res.status(404).send(err);
  //   });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
