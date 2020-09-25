const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/reviews', {useNewUrlParser: true});
// const { Seeder } = require('mongo-seeding');

const db = mongoose.connection;

// mongo seeding config
const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'reviews',
  },
  dropDatabase: true,
};

// get random number between min and max, inclusive
const getRandomInt = (min, max) => {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
}

const randomNames = ['Chris', 'Katie', 'Emmanuel', 'Josef', 'Kiara', 'Karen', 'Clarence', 'Jorge', 'Antonio',
                      'Elana', 'Lim', 'Jake', 'James', 'Johnny', 'Jorgen', 'Haneen', 'Mataeux', 'Theo', 'Ryan',
                      'Jacob', 'Jenny', 'Alex', 'Alissa', 'Andrew', 'Anna', 'Arun', 'Adjoa', 'Billy', 'Brian',
                      'Carina', 'Catherine', 'Daniel', 'Erfan', 'Eric', 'Harris', 'Harrison', 'Jen', 'Jessie',
                      'Joel', 'Johnny', 'Joesph', 'Karl', 'Katharine', 'Liz', 'Mike', 'Minji', 'Mylani', 'Rebecca',
                      'Rob', 'Shaquon', 'Sophie', 'Sokhary', 'Susan', 'Victoria', 'Watson', 'Yas'];

const randomText = ['apple', 'orange', 'pear', 'little', 'big', 'hack', 'reactor', 'review', 'great', 'the', 'a',
                     'is', 'of', 'will', 'tree', 'normal', 'abstract', 'your', 'job', 'free', 'work', 'stay','home',
                     'apartment', 'kite', 'rent', 'stay', 'like', 'roof', 'room', 'bathroom', 'lorem ipsum'];

const generateRandomReview = (length) => {
  let review = '';
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * randomText.length);
    // console.log(index);
    review += randomText[index] + ' ';
  }
  review = review.slice(0, review.length - 1);
  return review;
};

// generate a random document
const generateRandomDocument = (id) => {
  const doc = {
    userIcon: 'google.com',
    reviewText: generateRandomReview(100),
    date: new Date(),
    name: randomNames[getRandomInt(0, randomNames.length)],
    rating: {
      cleanliness: getRandomInt(1, 5),
      communication: getRandomInt(1, 5),
      checkIn: getRandomInt(1, 5),
      accuracy: getRandomInt(1, 5),
      location: getRandomInt(1, 5),
      value: getRandomInt(1, 5)
    }
  };
  return doc;
};

// schema of each individual review
const reviewSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
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

const initDB = () => {

  let documents = [];
  const numDocuments = 1000;

  const Review = mongoose.model('Review', reviewSchema);

  for (let i = 0; i < numDocuments; i++) {
    const doc = generateRandomDocument(i+1);
    documents.push(doc);
  }

  return Review.insertMany(documents);

};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // populate the database once we are connected
  initDB()
    .then(docs => {
      console.log('Successfully initialized database');
    })
    .catch(err => {
      console.log(err);
    });
});