import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';
import {FlexRow, FlexColumn} from './Constants.jsx';

const ReviewList = ( {reviews} ) => {
  let reviewCols = [[], []];

  // split reviews into chunks
  for (let i = 0; i < reviews.length; i += 2) {
    reviewCols[0].push(reviews[i]);
  }

  for (let i = 1; i < reviews.length; i += 2) {
    reviewCols[1].push(reviews[i]);
  }

  return (
    <>
      <FlexColumn>
      {reviewCols[0].map((review, i) => {
        return (
          <StyledReview text={review.reviewText} name={review.name} date={review.date} userIcon={review.userIcon} key={(i)}/>
        );
      })}
      </FlexColumn>
      <FlexColumn>
        {reviewCols[1].map((review, i) => {
          return (
            <StyledReview text={review.reviewText} name={review.name} date={review.date} userIcon={review.userIcon} key={(i)}/>
          );
        })}
      </FlexColumn>
    </>
  );
}

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;