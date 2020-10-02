import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';
import {FlexRow, FlexColumn} from './Flex.jsx';

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
    <div>
      <FlexRow>
        <FlexColumn>
        {reviewCols[0].map((review, i) => {
          return (
            <StyledReview review={review} key={(i)}/>
            // row.length === 2 ? <StyledReview review={row[1]} key={(i*2)+2}/> : null
          );
        })}
        </FlexColumn>
        <FlexColumn>
          {reviewCols[1].map((review, i) => {
            return (
              <StyledReview review={review} key={(i)}/>
            );
          })}
        </FlexColumn>
      </FlexRow>
    </div>
  );
}

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;