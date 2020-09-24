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

// schema of each individual review
const reviewSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  user_icon: String,
  review_text: String,
  date: Date,
  name: String,
  rating: {
    cleanliness: Number,
    communication: Number,
    check_in: Number,
    accuracy: Number,
    location: Number,
    value: Number
  }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // populate the database once we are connected
  initDB();
});

// get random number between min and max, inclusive
const getRandomInt = (min, max) => {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
}

const random_names = ['Chris', 'Katie', 'Emmanuel', 'Josef', 'Kiara', 'Karen', 'Clarence', 'Jorge', 'Antonio',
                      'Elana', 'Lim', 'Jake', 'James', 'Johnny', 'Jorgen', 'Haneen', 'Mataeux', 'Theo', 'Ryan',
                      'Jacob', 'Jenny', 'Alex', 'Alissa', 'Andrew', 'Anna', 'Arun', 'Adjoa', 'Billy', 'Brian',
                      'Carina', 'Catherine', 'Daniel', 'Erfan', 'Eric', 'Harris', 'Harrison', 'Jen', 'Jessie',
                      'Joel', 'Johnny', 'Joesph', 'Karl', 'Katharine', 'Liz', 'Mike', 'Minji', 'Mylani', 'Rebecca',
                      'Rob', 'Shaquon', 'Sophie', 'Sokhary', 'Susan', 'Victoria', 'Watson', 'Yas'];

const random_text = ['apple', 'orange', 'pear', 'little', 'big', 'hack', 'reactor', 'review', 'great', 'the', 'a',
                     'is', 'of', 'will', 'tree', 'normal', 'abstract', 'your', 'job', 'free', 'work', 'stay','home'.
                     'apartment', 'kite', 'rent', 'stay', 'like', 'roof', 'room', 'bathroom', 'lorem ipsum'];

const generateRandomReview = (length) => {
  let review = [];
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random(0, random_text.length));
    review.push(random_text[index]);
  }
}

// generate a random document
const generateRandomDocument = (id) => {
  const doc = {
    id: id,
    user_icon: 'google.com',
    review_text: generateRandomReview(100),
    date: new Date(),
    name: random_names[getRandomInt(0, random_names.length)],
    rating: {
      cleanliness: getRandomInt(1, 5),
      communication: getRandomInt(1, 5),
      check_in: getRandomInt(1, 5),
      accuracy: getRandomInt(1, 5),
      location: getRandomInt(1, 5),
      value: getRandomInt(1, 5)
    }
  }
  return doc;
}

const initDB = async () => {

  let bulkData = [];
  const numDocuments = 2;

  const Review = mongoose.model('Review', reviewSchema);

  for (let i = 0; i < numDocuments; i++) {
    const doc = generateRandomDocument(i+1);
    console.log(doc);
  }

  console.log('Initialized DB');
}