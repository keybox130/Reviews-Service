import React from 'react';

const Review = ( {review} ) => {
  return (
    <div>
      <img src={review.userIcon}></img>
    </div>
  );
}

export default Review;