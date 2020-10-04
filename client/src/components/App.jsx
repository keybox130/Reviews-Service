import React from 'react';
import axios from 'axios';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewList from './ReviewList.jsx';
import StyledAppModal from './AppModal.jsx';
import StyledShowAll from './ShowAll.jsx';
import styled from 'styled-components';
import { FlexRow, animation } from './Constants.jsx';
import { createGlobalStyle } from 'styled-components'

import _ from 'underscore';


// fake body div used for dimming the whole page
const Body = styled.div.attrs(props => {
  return {
    className: props.className
  }
})`
transition-duration: ${animation.dimDuration}ms;
&.dim {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(100,100,100);
}
`;

// flex column of all components
const ReviewComponent = styled.div.attrs(props => {
  return {
    className: props.className
  }
})`
z-index: 1;
margin: 3vh 3vw;
padding: 0 10vw;
display: flex;
flex-direction: column;
`;

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

    // update state of modal using ref
    this.modal = React.createRef();

  }

  componentDidMount() {
    this.getAllStays();
  }

  // extracts reviews for our service
  extractReviews(reviews) {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return reviews.map(review => {
        // map the date to month/year only
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

    // sum all rating types
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
    });
  }

  // shows the modal
  showModal() {
    this.setState({
      showModal: true
    }, () => {
      this.modal.current.setTransition(`enter`);
    });
  }

  // closes the modal after showing a transition
  closeModal() {
    this.modal.current.setTransition(`exit`, () => {
      console.log(`Exiting modal...`)
      setTimeout(() => {
        // un-dim the page after modal transition completes
        this.setState({
          showModal: false
        });
        console.log('Closed modal');
      }, animation.slideDuration);
    });
  }

  render() {

    // show a loading message until all reviews are loaded
    return !this.state.reviews.length ? <h1>Loading...</h1> :
    <>
      {this.state.showModal ? (<StyledAppModal ref={this.modal} reviews={this.state.reviews} ratings={this.state.ratings} close={this.closeModal.bind(this)} />) : null}
      <Body className={this.state.showModal ? 'dim' : null}>
        {/* show a transition if the modal is displayed */}
        <ReviewComponent>
          <FlexRow justify='left'>
            {/* rating overview banner */}
            <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} isModal={false}/>
          </FlexRow>
          <FlexRow justify='center'>
            {/* rating graphs */}
            <StyledRatingGraphs ratings={this.state.ratings} isModal={false}/>
          </FlexRow>
          <FlexRow justify='center'>
            {/* only render the top 6 arbitrarily sorted reviews */}
            <StyledReviewList reviews={this.state.reviews.sort().slice(0, 6)} />
          </FlexRow>
          <FlexRow justify='left'>
            {/* show all reviews button */}
            {this.state.showModal ? null : <StyledShowAll numReviews={this.state.reviews.length} onClick={this.showModal.bind(this)}/>}
          </FlexRow>
        </ReviewComponent>
      </Body>
    </>
  }
}

export default App;