import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import _ from 'underscore';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewList from './ReviewList.jsx';
import StyledAppModal from './AppModal.jsx';
import StyledShowAll from './ShowAll.jsx';
import { FlexRow, Animation } from './Constants.jsx';

// overlay used for dimming the whole page
const Dimmable = styled.div.attrs((props) => ({ className: props.className }))`

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
const ReviewComponent = styled.div.attrs((props) => ({ className: props.className }))`
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

// extracts average ratings for our service
const extractRatings = (reviews) => {
  let overallAverage = 0;
  const ratings = {
    cleanliness: 0,
    communication: 0,
    checkIn: 0,
    accuracy: 0,
    location: 0,
    value: 0,
  };

  // sum all rating types
  _.each(reviews, (review) => {
    ratings.cleanliness += review.rating.cleanliness;
    ratings.communication += review.rating.communication;
    ratings.checkIn += review.rating.checkIn;
    ratings.accuracy += review.rating.accuracy;
    ratings.location += review.rating.location;
    ratings.value += review.rating.value;
  });

  // get average of each rating type
  _.each(ratings, (value, key) => {
    const average = value / reviews.length;
    ratings[key] = average;
    overallAverage += average;
  });

  // average of all rating types
  overallAverage /= Object.keys(ratings).length;
  ratings.average = overallAverage.toFixed(2);

  return ratings;
};

// extracts reviews for our service
const extractReviews = (reviews) => {
  return reviews.map((review) => {
    return _.pick(review,
      'month',
      'year',
      'name',
      'reviewText',
      'userIcon',
    );
  });
};

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
        value: 0,
      },
      showModal: false, // whether to show modal
      showButton: true, // whether to render showAll button
      dimClass: 'none', // which direction to animate
    };

    // update state of modal using ref
    this.modal = React.createRef();
    this.hideModal = this.hideModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentDidMount() {
    const stayId = Math.ceil(Math.random() * 100);
    this.getStay(stayId);
  }

  // gets a stay from the server based on id
  getStay(stayId) {
    axios.get(`/reviews/stays/:${stayId}`)
      .then((rooms) => {
        this.setState({
          reviews: extractReviews(rooms.data.reviews),
          ratings: extractRatings(rooms.data.reviews),
        });
      });
  }

  // hides the modal after showing a transition
  hideModal() {
    // close the modal first
    this.modal.current.setTransition('exit', () => {
      Promise.resolve(
        // un-dim the page after modal slide animation completes
        setTimeout(() => {
          this.setState({
            dimClass: 'dimExit',
          });
        }, Number(Animation.modalSlideDuration)),
      )
        .then(() => {
          // reshow the button and hide modal/dim class
          setTimeout(() => {
            this.setState({
              showButton: true,
              showModal: false,
              dimClass: 'none',
            });
          }, Number(Animation.dimDuration));
        });
    });
  }

  // shows the modal (delay handled within modal's css animation)
  renderModal() {
    Promise.resolve(
      // hide button after click animation completes
      setTimeout(() => {
        this.setState({
          showButton: false
        });
      }, Number(Animation.clickDuration)),
    )
      .then(() => {
        // dim the page
        this.setState({
          dimClass: 'dimEnter',
          showModal: true,
        });
      })
      .then(() => {
        // modal animation
        this.modal.current.setTransition('enter');
      });
  }

  render() {
    const {
      dimClass, reviews, ratings, showButton, showModal,
    } = this.state;
    // show all reviews button
    const ShowAllButton = showButton
      ? <StyledShowAll numReviews={reviews.length} onClick={this.renderModal} />
      : null;
    // only render when state updates
    return !reviews.length
      ? null
      : (
        <>
          {/* pop-up review modal */}
          { showModal
            ? (
              <StyledAppModal
                ref={this.modal}
                reviews={reviews}
                ratings={ratings}
                close={this.hideModal}
              />
            )
            : null }

          {/* show a transition if the modal is displayed */}
          <ReviewComponent className={showModal ? 'blur' : null}>
            <FlexRow justify="left">
              {/* rating overview banner */}
              <StyledRatingOverview average={ratings.average} numReviews={reviews.length} />
            </FlexRow>
            <FlexRow justify="left">
              {/* rating graphs */}
              <StyledRatingGraphs ratings={ratings} />
            </FlexRow>
            <FlexRow justify="left">
              {/* only render the top 6 arbitrarily sorted reviews */}
              <StyledReviewList reviews={reviews.sort().slice(0, 6)} />
            </FlexRow>
            <FlexRow justify="left">

              { ShowAllButton }

            </FlexRow>
          </ReviewComponent>

          <Dimmable className={dimClass} />

        </>
      );
  }
}

export default ReviewApp;