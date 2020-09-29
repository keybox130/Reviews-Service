import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const ReviewList = ( {reviews} ) => {
  let reviewRows = [];

  // split reviews into chunks
  for (let i = 0; i < reviews.length; i += 2) {
    reviewRows.push(reviews.slice(i, i+2));
  }

  return (
    <div>
      {reviewRows.map((row, i) => {
        return (
        <FlexRow key={(i*3)}>
          <StyledReview review={row[0]} key={(i*3)+1}/>
          {/* don't render last column if it doesn't exist */}
          {row.length === 2 ? <StyledReview review={row[1]} key={(i*3)+2}/> : null}
        </FlexRow>
        );
      })}
    </div>
  );
}

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;