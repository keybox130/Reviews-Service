import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Fonts, FlexColumn, Container, Animation, compareFunction } from './Constants.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';

const ReviewModal = styled.div.attrs((props) => ({ className: props.className }))`
  top: 0;
  visibility: hidden;
  z-index: 3;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-style: none;
  border-width: 5px;
  border-radius: 15px;
  height: 85vh;
  width: 1000px;
  margin: 0 20vw;
  margin-top: 2vh;
  padding: 24px;
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
    visibility: visible;
    animation-name: slideIn;
    animation-duration: ${Animation.modalSlideDuration}ms;
    animation-fill-mode: both;
    /* should start animation after dim/blur animation completes */
    animation-delay: ${Animation.dimDuration}ms;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  &.exit {
    visibility: visible;
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
  margin-left: 0px;
  margin-top: -50px;
  padding: 13px 15px;
  outline: none;
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
  constructor({ reviews, ratings, close, callback, transition }) {
    super();
    this.state = {
      reviews,
      ratings,
      close,
      transition,
      isExiting: false,
    };
    this.reviewListRef = React.createRef();
  }

  setTransition(transition, callback) {
    Promise.resolve(this.reviewListRef.current.setTransition(transition)).then(() => {
      setTimeout(() => {
        this.setState(
          {
            transition,
          },
          callback
        );
      }, Number(Animation.reviewDelay[transition]));
    });
  }

  render() {
    const { transition, close, ratings, reviews, isExiting, reviewListRef } = this.state;
    const renderLoader = () => <p>Loading</p>;
    const StyledRatingOverview = lazy(() => import('./RatingOverview.jsx'));
    const StyledRatingGraphs = lazy(() => import('./RatingGraphs.jsx'));
    // const StyledReviewListModal = lazy(() => import('./ReviewListModal.jsx'));

    return (
      <ReviewModal className={transition}>
        <FlexColumn>
          <Container>
            <CloseButton onClick={close}>
              <X
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
              >
                <path d="m6 6 20 20" />
                <path d="m26 6-20 20" />
              </X>
            </CloseButton>
          </Container>
          <Suspense fallback={renderLoader}>
            <StyledRatingOverview average={ratings.average} numReviews={reviews.length} isModal />
          </Suspense>
          <Suspense fallback={renderLoader}>
            <StyledRatingGraphs ratings={ratings} isModal />
          </Suspense>
        </FlexColumn>
        <FlexColumn>
          <StyledReviewListModal ref={this.reviewListRef} reviews={reviews.sort(compareFunction)} />
        </FlexColumn>
      </ReviewModal>
    );
  }
}

const StyledAppModal = styled(AppModal)``;

export default StyledAppModal;
