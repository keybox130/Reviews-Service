import React from 'react';
import axios from 'axios';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewList from './ReviewList.jsx';
import StyledReviewModal from './ReviewModal.jsx';
import StyledShowAll from './ShowAll.jsx';
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
      },
      showModal: false
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

    _.each(reviews, review => {
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
    ratings.average = overallAverage.toFixed(2);

    return ratings;
  }

  // gets first stay from the server (will be refactored to get stay based on id)
  getAllStays() {
    axios.get('/stays')
    .then(rooms => {
      this.setState({
        reviews: this.extractReviews(rooms.data[0].reviews),
        ratings: this.extractRatings(rooms.data[0].reviews)
      });
      console.log(JSON.stringify(this.state.reviews.slice(0,6)));
    });
  }

  showAllReviews() {
    console.log('Showing all reviews');
  }

  render() {

    return !this.state.reviews.length ? <h1>Loading...</h1> :
    <div>
      <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} />
      <StyledRatingGraphs ratings={this.state.ratings}/>
      {/* only render the top 6 arbitrarily sorted reviews */}
      <StyledReviewList reviews={this.state.reviews.sort().slice(0, 6)} />
      <StyledShowAll numReviews={this.state.reviews.length} onClick={this.showAllReviews.bind(this)}/>
      {this.state.showModal ? (<StyledReviewModal />) : null}
    </div>
  }
}

export default App;