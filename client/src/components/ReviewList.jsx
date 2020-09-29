import React from 'react';
import Review from './Review.jsx';

const ReviewList = ( {reviews} ) => {
  console.log(reviews);
  debugger;
  return (
    <div>
      {reviews.map((review, i) => {
        return <Review key={i} review={review}/>
      })}
    </div>
  );
}

export default ReviewList;