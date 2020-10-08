const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true });
const dbo = mongoose.connection;

const roomSchema = new mongoose.Schema({
  room_id: Number,
  reviews: Array,
});

// schema of each individual review (unused)
/* const reviewSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  roomId: Number,
  userIcon: String,
  reviewText: String,
  date: Date,
  name: String,
  rating: {
    cleanliness: Number,
    communication: Number,
    checkIn: Number,
    accuracy: Number,
    location: Number,
    value: Number
  }
}); */

const Room = mongoose.model('Room', roomSchema);

module.exports = {
  dbo,
  Room,
}