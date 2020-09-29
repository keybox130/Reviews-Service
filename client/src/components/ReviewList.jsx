import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const ReviewList = ( {reviews} ) => {
  // console.log(reviews);
  return (
    <div>
      <FlexRow>
        <StyledReview review={reviews[0]}/>
        <StyledReview review={reviews[1]}/>
      </FlexRow>
      <FlexRow>
          <StyledReview review={reviews[2]}/>
          <StyledReview review={reviews[3]}/>
      </FlexRow>
      <FlexRow>
        <StyledReview review={reviews[4]}/>
        <StyledReview review={reviews[5]}/>
      </FlexRow>
    </div>
  );
}

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;