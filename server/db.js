const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});
const dbo = mongoose.connection;

// schema of each individual review
const reviewSchema = new mongoose.Schema({
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
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  dbo,
  Review
}