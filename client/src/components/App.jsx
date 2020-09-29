import React from 'react';
import axios from 'axios';
import StyledReviewList from './ReviewList.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: []
    }

  }

  componentDidMount() {
    this.getAllStays();
  }

  // format the reviews for our service
  formatReviews(reviews) {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return reviews.map(review => {
      const month = months[Number(review.date.slice(5, 7))];
      const year = review.date.slice(0, 4);
      review.date = month.toString() + ' ' + year;
      return review;
    });
  }

  // gets first stay from the server (will be refactored to get stay)
  getAllStays() {
    axios.get('/stays')
    .then(rooms => {
      this.setState({
        reviews: this.formatReviews(rooms.data[0].reviews)
      });
    });
  }

  render() {
    return !this.state.reviews.length ? <h1>Loading...</h1> :
    <div>
      <StyledReviewList reviews={this.state.reviews}/>
    </div>
  }
}

export default App;