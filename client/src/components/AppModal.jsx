import React from 'react';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';
import styled from 'styled-components';
import {Fonts, FlexColumn, Container, Animation} from './Constants.jsx';

const ReviewModal = styled.div.attrs(props =>
  ({className: props.className})
)`
z-index: 3;
position: fixed;
display: flex;
flex-direction: row;
justify-content: flex-start;
background-color: white;
border-style: none;
border-width: 5px;
border-radius: 15px;
height: 85vh;
max-width: 60vw;
margin: 0 20vw;
margin-top: 2vh;
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
  animation-duration: ${Animation.modalSlideDuration}ms;
  animation-fill-mode: both;
  /* should start animation after dim/blur animation completes */
  animation-delay: ${Animation.dimDuration}ms;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1.0);
}

&.exit {
  animation-name: slideOut;
  animation-duration: ${Animation.modalSlideDuration}ms;
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
  max-height: 10vh;
  max-width: 10vw;
  margin-left: -15px;
  margin-top: -10px;
  padding: 13px 15px;
  outline:none;
  font-weight: ${Fonts.normal};
  font-family: ${Fonts.family};
  font-size: ${Fonts.header};
  :hover {
    cursor: pointer;
    background-color: rgb(247, 247, 247);
  }
`;

const X = styled.svg`
display: block;
fill: none;
height: 16px;
width: 16px;
stroke: currentcolor;
stroke-width: 3;
overflow: visible;
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
            <CloseButton onClick={this.state.close}>
              <X viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false'>
                <path d="m6 6 20 20"></path><path d="m26 6-20 20"></path>
              </X>
            </CloseButton>
          </Container>
          <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} isModal={true} />
          <StyledRatingGraphs ratings={this.state.ratings} isModal={true} />
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