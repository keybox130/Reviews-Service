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
  const range = max - min;
  return Number(((Math.random() * range) + min).toFixed(numDecimalPlaces));
};

// get random int between min and max, inclusive
const getRandomInt = (min, max) => {
  const range = max - min;
  return Math.round(Math.random() * range) + min;
};

const generateReviewText = () => {
  const text = [];
  // generate random review of length between 50-150
  const numWords = getRandomInt(50, 150);
  for (let i = 0; i < numWords; i++) {
    // get a random word from randomText
    const index = getRandomInt(0, randomText.length);
    text.push(randomText[index]);
  }
  return text.join(' ');
};

const getRandomPhoto = () => {
  // min and max photo ids from S3
  const min = 69900;
  const max = 69999;
  let photoId = getRandomInt(min, max);
  return `https://keybox-review-images.s3-us-west-1.amazonaws.com/${photoId}.png`;
};

// generate a random document
const generateRandomReview = () => {
  const minRating = getRandomInt(1, 5);

  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[getRandomInt(1, 12)];
  const years = ['2016', '2017', '2018', '2019', '2020'];
  const year = years[getRandomInt(0, 4)];

  const review = {
    userIcon: getRandomPhoto(),
    reviewText: generateReviewText(),
    month,
    year,
    name: randomNames[getRandomInt(0, randomNames.length)],
    rating: {
      cleanliness: getRandomFloat(minRating, 5),
      communication: getRandomFloat(minRating, 5),
      checkIn: getRandomFloat(minRating, 5),
      accuracy: getRandomFloat(minRating, 5),
      location: getRandomFloat(minRating, 5),
      value: getRandomFloat(minRating, 5),
    },
  };

  return review;
};

const generateRandomReviews = () => {
  const reviews = [];
  const numReviews = 100;
  for (let i = 0; i < numReviews; i++) {
    reviews.push(generateRandomReview());
  }
  return reviews;
};

const initDB = () => {
  const numRooms = 100;

  // create a random sample of reviews
  const reviewSamples = generateRandomReviews();
  const rooms = [];

  for (let i = 0; i < numRooms; i++) {
    const numReviews = getRandomInt(20, 50);
    // a room has many reviews
    const room = {
      room_id: i + 1,
      reviews: [],
    };
    // generate 'numRooms' random rooms
    for (let i = 0; i < numReviews; i++) {
      // give each room 30 reviews (for now) by sampling from array of generated reviews
      const randomReview = reviewSamples[getRandomInt(0, reviewSamples.length - 1)];
      room.reviews.push(randomReview);
    }
    rooms.push(room);
  }

  // insert them and return the promise
  return db.Room.insertMany(rooms);
};

const seedDB = () => {
  // populate the database once we are connected (if necessary!)
  db.Room.find({}).exec()
    .then((docs) => {
    // check if there are already docs in the database
      if (!docs.length) {
        initDB()
          .then(() => {
            console.log('Successfully initialized database');
          })
          .catch((err) => {
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