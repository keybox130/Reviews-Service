import React from 'react';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';
import styled from 'styled-components';
import {Fonts, FlexColumn, Container, animation} from './Constants.jsx';

const ReviewModal = styled.div.attrs(props => {
  return {
    className: props.className
  }
})`
z-index: 2;
position: absolute;
display: flex;
flex-direction: row;
justify-content: flex-start;
background-color: white;
border-style: none;
border-width: 5px;
border-radius: 15px;
height: 85vh;
max-width: 60vw;
margin: 5vh 20vw;
padding-top: 7vh;
box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translate(0px, 100%);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translate(0px, 100%);
  }
}

&.enter {
  animation-name: slideIn;
  animation-duration: ${animation.slideDuration}ms;
  animation-fill-mode: both;
  /* should start animation after dim/blur animation completes */
  animation-delay: ${animation.dimDuration}ms;
  animation-timing-function: cubic-bezier(0.8, 0.2, 0.2, 0.8);
}

&.exit {
  animation-name: slideOut;
  animation-duration: ${animation.slideDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.8, 0.2, 0.2, 0.8);
}

`;

const CloseButton = styled.button`
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  border-style: none;
  display: flex;
  justify-content: center;
  text-align: center;
  max-height: 8vh;
  margin-left: -25px;
  padding: 13px 23px;
  margin-bottom: 10px;
  outline:none;
  font-weight: ${Fonts.normal};
  font-family: ${Fonts.family};
  font-size: ${Fonts.header};
  :hover {
    cursor: pointer;
    background-color: rgb(247, 247, 247);
  }
`;

class AppModal extends React.Component {
  constructor({reviews, ratings, close, callback, transition}) {
    super();
    this.state = {
      reviews: reviews,
      ratings: ratings,
      close: close,
      transition: transition
    }
  }

  setTransition(transition, callback) {
    this.setState({
      transition: transition
    }, callback);
  }

  render() {
    return (
      <ReviewModal className={this.state.transition}>
        <FlexColumn className='modal'>
          <Container>
            <CloseButton onClick={this.state.close}>x</CloseButton>
          </Container>
          <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} isModal={true}/>
          <StyledRatingGraphs ratings={this.state.ratings} isModal={true}/>
        </FlexColumn>
        <FlexColumn>
          <StyledReviewListModal reviews={this.state.reviews.sort()} />
        </FlexColumn>
      </ReviewModal>
      );
  }
}

const StyledAppModal = styled(AppModal)`
`;

export default StyledAppModal;