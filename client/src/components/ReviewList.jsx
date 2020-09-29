import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const ReviewList = ( {reviews} ) => {
  console.log(reviews);
  return (
    <div>
      {reviews.map((review, i) => {
        return <StyledReview key={i} review={review}/>
      })}
    </div>
  );
}

const StyledReviewList = styled(ReviewList)`
`;

export default ReviewList;