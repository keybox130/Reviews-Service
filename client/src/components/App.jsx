import React from 'react';
import axios from 'axios';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewList from './ReviewList.jsx';
import StyledAppModal from './AppModal.jsx';
import StyledShowAll from './ShowAll.jsx';
import styled from 'styled-components';
import { FlexRow, Animation } from './Constants.jsx';

import _ from 'underscore';

// overlay used for dimming the whole page
const Dimmable = styled.div.attrs(props =>
    ({className: props.className})
)`

@keyframes dimPage {
  0% {
    filter: none;
    background-color: none;
  }
  100% {
    opacity: 0.5;
    background-color: rgb(0,0,0);
  }
}

@keyframes unDimPage {
  0% {
    opacity: 0.5;
    background-color: rgb(0,0,0);
  }
  100% {
    filter: none;
    background-color: none;
  }
}

&.dimEnter {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  animation-direction: forwards;
  animation-name: dimPage;
  animation-duration: ${Animation.dimDuration}ms;
  animation-delay: ${Animation.clickDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

&.dimExit {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  animation-direction: forwards;
  animation-name: unDimPage;
  animation-duration: ${Animation.dimDuration}ms;
  animation-delay: ${Animation.clickDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: linear;
}
`;

// flex column of all components
const ReviewComponent = styled.div.attrs(props =>
    ({className: props.className})
)`
z-index: 1;
margin: 3vh 3vw;
padding: 0 10vw;
display: flex;
flex-direction: column;
transition-duration: ${Animation.dimDuration}ms;
&.blur {
  filter: blur(2px);
}
`;

class ReviewApp extends React.Component {
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
      showModal: false, // whether to show modal
      showButton: true, // whether to render showAll button
      dimClass: `none` // which direction to animate

    }

    // update state of modal using ref
    this.modal = React.createRef();

  }

  componentDidMount() {
    const stayId = Math.round(Math.random() * 100);
    this.getStay(stayId);
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

  // gets a stay from the server based on id
  getStay(stayId) {
    axios.get(`/stays/:${stayId}`)
    .then(rooms => {
      this.setState({
        reviews: this.extractReviews(rooms.data.reviews),
        ratings: this.extractRatings(rooms.data.reviews)
      });
    });
  }

  // shows the modal (delay handled within modal's css animation)
  showModal() {
    Promise.resolve(
      // hide button after click animation completes
      setTimeout(() => {
        this.setState({
          showButton: false
        });
      }, Number(Animation.clickDuration))
    )
    .then(() => {
      // dim the page
      this.setState({
        dimClass: `dimEnter`,
        showModal: true
      });
    })
    .then(() => {
      // modal animation
      this.modal.current.setTransition(`enter`);
    })
  }

  // closes the modal after showing a transition
  closeModal() {
    // close the modal first
    this.modal.current.setTransition(`exit`, () => {
      Promise.resolve(
        // un-dim the page after modal slide animation completes
        setTimeout(() => {
          this.setState({
            dimClass: `dimExit`
          });
      }, Number(Animation.modalSlideDuration)))
      .then(() => {
        // reshow the button and hide modal/dim class
        setTimeout(() => {
          this.setState({
            showButton: true,
            showModal: false,
            dimClass: `none`
          })
        }, Number(Animation.dimDuration))
      });
    });
  }

  render() {
    // pop-up review modal
    const ReviewModal = this.state.showModal
      ? (<StyledAppModal ref={this.modal} reviews={this.state.reviews} ratings={this.state.ratings} close={this.closeModal.bind(this)} />)
      : null;
    // show all reviews button
    const ShowAllButton = this.state.showButton
      ? <StyledShowAll numReviews={this.state.reviews.length} onClick={this.showModal.bind(this)}/>
      : null;
    // only render when state updates
    return !this.state.reviews.length
      ? null
      : (
        <>

        { ReviewModal }

        {/* show a transition if the modal is displayed */}
          <ReviewComponent className={this.state.showModal ? `blur` : null}>
            <FlexRow justify='left'>
              {/* rating overview banner */}
              <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} isModal={false} />
            </FlexRow>
            <FlexRow justify='left'>
              {/* rating graphs */}
              <StyledRatingGraphs ratings={this.state.ratings} isModal={false} />
            </FlexRow>
            <FlexRow justify='left'>
              {/* only render the top 6 arbitrarily sorted reviews */}
              <StyledReviewList reviews={this.state.reviews.sort().slice(0, 6)} />
            </FlexRow>
            <FlexRow justify='left'>

              { ShowAllButton }

            </FlexRow>
          </ReviewComponent>

        <Dimmable className={this.state.dimClass} />

        </>
      );
  }
}

export default ReviewApp;