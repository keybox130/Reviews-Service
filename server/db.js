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

// get random int between min and max, inclusive
const getRandomInt = (min, max) => {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
}

// get random float between min and max, inclusive and rounded to numDecimalPlaces
const getRandomFloat = (min, max) => {
  const numDecimalPlaces = 2;
  let range = max - min;
  return Number(((Math.random() * range) + min).toFixed(numDecimalPlaces));
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

const generateRandomReview = () => {
  let review = [];
  // generate random review of length between 50-150
  let reviewLength = getRandomInt(50,150);
  for (let i = 0; i < reviewLength; i++) {
    // get a random word from randomText
    let index = getRandomInt(0, randomText.length);
    review.push(randomText[index]);
  }
  return review.join(' ');
};

// generate a random document
const generateRandomDocument = (id) => {
  const doc = {
    userIcon: 'google.com',
    reviewText: generateRandomReview(100),
    date: new Date(),
    name: randomNames[getRandomInt(0, randomNames.length)],
    rating: {
      cleanliness: getRandomFloat(1, 5),
      communication: getRandomFloat(1, 5),
      checkIn: getRandomFloat(1, 5),
      accuracy: getRandomFloat(1, 5),
      location: getRandomFloat(1, 5),
      value: getRandomFloat(1, 5)
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

const Review = mongoose.model('Review', reviewSchema);

const initDB = () => {

  let documents = [];
  const numDocuments = 100;

  // generate 'numDocuments' random documents
  for (let i = 0; i < numDocuments; i++) {
    const doc = generateRandomDocument(i+1);
    documents.push(doc);
  }

  // insert them and return the promise
  return Review.insertMany(documents);

};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // populate the database once we are connected (if necessary!)
  Review.find({}).exec()
  .then(docs => {
    // check if there are already docs in the database
    if (!docs.length) {
      initDB()
        .then(docs => {
          console.log('Successfully initialized database');
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      console.log('Database is already populated!');
    }
  });
});