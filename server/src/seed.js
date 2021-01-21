const db = require('./db/mongo');
const { exec } = require('child_process');
const path = require('path');
const fsPromises = require('fs').promises;
const faker = require('faker');

const randomNames = [
  'Chris',
  'Katie',
  'Emmanuel',
  'Josef',
  'Kiara',
  'Karen',
  'Clarence',
  'Jorge',
  'Antonio',
  'Elana',
  'Lim',
  'Jake',
  'James',
  'Johnny',
  'Jorgen',
  'Haneen',
  'Mataeux',
  'Theo',
  'Ryan',
  'Jacob',
  'Jenny',
  'Alex',
  'Alissa',
  'Andrew',
  'Anna',
  'Arun',
  'Adjoa',
  'Billy',
  'Brian',
  'Carina',
  'Catherine',
  'Daniel',
  'Erfan',
  'Eric',
  'Harris',
  'Harrison',
  'Jen',
  'Jessie',
  'Joel',
  'Johnny',
  'Joesph',
  'Karl',
  'Katharine',
  'Liz',
  'Mike',
  'Minji',
  'Mylani',
  'Rebecca',
  'Rob',
  'Shaquon',
  'Sophie',
  'Sokhary',
  'Susan',
  'Victoria',
  'Watson',
  'Yas',
];

// get random float between min and max, inclusive and rounded to numDecimalPlaces
const getRandomFloat = (min, max) => {
  const numDecimalPlaces = 2;
  const range = max - min;
  return Number((Math.random() * range + min).toFixed(numDecimalPlaces));
};

// get random int between min and max, inclusive
const getRandomInt = (min, max) => {
  const range = max - min;
  return Math.round(Math.random() * range) + min;
};

const getRandomPhoto = () => {
  // random photo from local storage
  const min = 1;
  const max = 21;
  let photoId = getRandomInt(min, max);
  return `http://localhost:3003/keybox/reviews/photos/${photoId}.webp`;
};

// generate a random document
const generateRandomReview = () => {
  const minRating = getRandomInt(1, 5);

  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[getRandomInt(1, 12)];
  const years = ['2016', '2017', '2018', '2019', '2020'];
  const year = years[Math.round(Math.random(4))];

  const review = {
    userIcon: getRandomPhoto(),
    reviewText: faker.lorem.sentence(getRandomInt(15, 50)),
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

const initDB = async () => {
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
  await db.Room.insertMany(rooms);
};

const createRedisScript = async () => {
  // export the db as a JSON
  const cmd = `mongoexport --collection rooms --out ./public/db/rooms.json --uri="mongodb://localhost/reviews" --jsonArray`;
  exec(cmd, async (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    const rooms = require('../../public/db/rooms.json');
    let script = ``;
    rooms.forEach((room) => {
      script += `SET room:${room.room_id} '${JSON.stringify(room)}'

      `;
    });
    try {
      await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'public', 'db', 'rooms.txt'),
        script
      );
      console.log('Wrote redis script file.');
    } catch (err) {
      console.error(`Couldn't write redis script file.`);
      console.error(err);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

const seedDB = async () => {
  // populate the database once we are connected (if necessary!)
  let docs;
  try {
    docs = await db.Room.find({});
  } catch (err) {
    throw err;
  }
  // check if there are already docs in the database
  if (docs && !docs.length) {
    try {
      await initDB();
      console.log('Successfully initialized database');
      await createRedisScript();
    } catch (err) {
      console.error(err);
    }
  } else {
    console.error('Database is already populated!');
  }
};

seedDB();
