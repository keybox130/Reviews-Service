const db = require('./db.js');

const randomNames = ['Chris', 'Katie', 'Emmanuel', 'Josef', 'Kiara', 'Karen', 'Clarence', 'Jorge', 'Antonio',
  'Elana', 'Lim', 'Jake', 'James', 'Johnny', 'Jorgen', 'Haneen', 'Mataeux', 'Theo', 'Ryan',
  'Jacob', 'Jenny', 'Alex', 'Alissa', 'Andrew', 'Anna', 'Arun', 'Adjoa', 'Billy', 'Brian',
  'Carina', 'Catherine', 'Daniel', 'Erfan', 'Eric', 'Harris', 'Harrison', 'Jen', 'Jessie',
  'Joel', 'Johnny', 'Joesph', 'Karl', 'Katharine', 'Liz', 'Mike', 'Minji', 'Mylani', 'Rebecca',
  'Rob', 'Shaquon', 'Sophie', 'Sokhary', 'Susan', 'Victoria', 'Watson', 'Yas'];

const randomText = ['apple', 'orange', 'pear', 'little', 'big', 'hack', 'reactor', 'review', 'great', 'the', 'a',
  'is', 'of', 'will', 'tree', 'normal', 'abstract', 'your', 'job', 'free', 'work', 'stay','home',
  'apartment', 'kite', 'rent', 'stay', 'like', 'roof', 'room', 'bathroom', 'lorem ipsum'];

// get random float between min and max, inclusive and rounded to numDecimalPlaces
const getRandomFloat = (min, max) => {
  const numDecimalPlaces = 2;
  let range = max - min;
  return Number(((Math.random() * range) + min).toFixed(numDecimalPlaces));
};

// get random int between min and max, inclusive
const getRandomInt = (min, max) => {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
};

const generateReviewText = () => {
  let text = [];
  // generate random review of length between 50-150
  let numWords = getRandomInt(50,150);
  for (let i = 0; i < numWords; i++) {
    // get a random word from randomText
    let index = getRandomInt(0, randomText.length);
    text.push(randomText[index]);
  }
  return text.join(' ');
};

const getRandomPhoto = () => {
  // min and max photo ids from S3
  let min = 69900;
  let max = 69999;
  let photoId = getRandomInt(min, max);
  return 'https://keybox-review-images.s3-us-west-1.amazonaws.com/' + photoId + '.png';
}

// generate a random document
const generateRandomReview = () => {
  const review = {
    userIcon: getRandomPhoto(),
    reviewText: generateReviewText(),
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

  return review;
};

// mongo seeding config
const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'reviews',
  },
  dropDatabase: true,
};

const generateRandomReviews = () => {
  let reviews = [];
  const numReviews = 100;
  for (let i = 0; i < numReviews; i++) {
    reviews.push(generateRandomReview());
  }
  return reviews;
}

const initDB = () => {

  const numRooms = 100;
  const numReviews = 30;

  // create a random sample of reviews
  let reviewSamples = generateRandomReviews();
  let rooms = [];

  for (let i = 0; i < numRooms; i++) {
    // a room has many reviews
    let room = {
      room_id: i+1,
      reviews: []
    }
    // generate 'numRooms' random rooms
    for (let i = 0; i < numReviews; i++) {
      // give each room 30 reviews (for now) by sampling from array of generated reviews
      let randomReview = reviewSamples[getRandomInt(0, reviewSamples.length)];
      room.reviews.push(randomReview);
    }
    rooms.push(room)
  }

  // insert them and return the promise
  return db.Room.insertMany(rooms);

};

const seedDB = () => {
  // populate the database once we are connected (if necessary!)
  db.Room.find({}).exec()
  .then(docs => {
    // check if there are already docs in the database
    if (!docs.length) {
      initDB()
      .then(docs => {
        console.log('Successfully initialized database');
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log('Database is already populated!');
    }
  })
  .catch(err => {
    throw err;
  });
};

seedDB();