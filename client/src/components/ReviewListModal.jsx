import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
max-width: 2vw;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 3vw;
`;

const ReviewListModal = ( {reviews} ) => {

  return (
    <FlexColumn>
      {reviews.map((review, i) => {
        return (
          <StyledReview review={review} key={(i)}/>
        );
        })}
    </FlexColumn>
  );
}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;