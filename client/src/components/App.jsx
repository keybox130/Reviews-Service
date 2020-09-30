import React from 'react';
import axios from 'axios';
import StyledRatingGraph from './RatingOverview.jsx';
import StyledReviewList from './ReviewList.jsx';
import _ from 'underscore';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: [],
      ratings: {
        average: 0,
        cleanliness: 0,
        communication: 0,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0
      }
    }

  }

  componentDidMount() {
    this.getAllStays();
  }

  // extracts reviews for our service
  extractReviews(reviews) {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return reviews.map(review => {
        const month = months[Number(review.date.slice(5, 7))];
        const year = review.date.slice(0, 4);
        review.date = month.toString() + ' ' + year;
        review = _.pick(review,
          'date',
          'name',
          'reviewText',
          'userIcon'
        );
        return review;
    });
  }

  // extracts average ratings for our service
  extractRatings(reviews) {

    let overallAverage = 0;

    let ratings = {
      cleanliness: 0,
      communication: 0,
      checkIn: 0,
      accuracy: 0,
      location: 0,
      value: 0
    }

    reviews.forEach(review => {
      ratings.cleanliness += review.rating.cleanliness;
      ratings.communication += review.rating.communication;
      ratings.checkIn += review.rating.checkIn;
      ratings.accuracy += review.rating.accuracy;
      ratings.location += review.rating.location;
      ratings.value += review.rating.value;
    });

    // get average of each rating type
    _.each(ratings, (value, key) => {
      let average = value / reviews.length;
      ratings[key] = average;
      overallAverage += average;
    })

    // average of all rating types
    overallAverage /= Object.keys(ratings).length;
    ratings.average = overallAverage;

    // console.log(ratings);
    return ratings;
  }

  // gets first stay from the server (will be refactored to get stay)
  getAllStays() {
    axios.get('/stays')
    .then(rooms => {
      this.setState({
        reviews: this.extractReviews(rooms.data[0].reviews),
        ratings: this.extractRatings(rooms.data[0].reviews)
      });
    });
  }

  render() {
    return !this.state.reviews.length ? <h1>Loading...</h1> :
    <div>
      <StyledRatingGraph ratings={this.state.ratings}/>
      <StyledReviewList reviews={this.state.reviews}/>
    </div>
  }
}

export default App;