const express = require('express');
const compression = require('compression');
const db = require('./db/redis');
const path = require('path');
const client = require('redis').createClient();

const app = express();
const port = 3003;
app.use(compression());

db.load();

// send html, bundles, and fonts/stylesheets
app.use(express.static(path.join(__dirname, '..', '..', 'public', 'fonts')));
app.use(express.static(path.join(__dirname, '..', '..', 'public', 'dist')));
app.use(express.static(path.join(__dirname, '..', '..', 'public', 'db')));
app.use(express.static(path.join(__dirname, '..', '..', 'public', 'static-images')));

client.on('error', (err) => console.error(err));

/**
 * Sends a stay matching the provided roomId
 */
app.get('/reviews/stays/:id', (req, res) => {
  const { id } = req.params;
  client.get(`room:${id}`, (err, room) => {
    if (err || !room) {
      console.error(err);
      res.sendStatus(404);
    }
    res.status(200).send(JSON.parse(room));
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
