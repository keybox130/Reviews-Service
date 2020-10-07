import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';
import {FlexRow, FlexColumn} from './Constants.jsx';

const ReviewList = ( {reviews} ) => {
  let reviewRows = [];

  // split reviews into rows
  for (let i = 0; i < reviews.length; i += 2) {
    reviewRows.push(reviews.slice(i, i+2));
  }

  return (
    <FlexColumn>
      {reviewRows.map((reviewRow, i) => {
        return (
          <FlexRow key={i*3}>
            <StyledReview text={reviewRow[0].reviewText} name={reviewRow[0].name} date={reviewRow[0].date} userIcon={reviewRow[0].userIcon} key={(i*3)+1} />
            {/* Only render last review if number of reviews isn't odd */}
            {reviewRow.length === 2 ? <StyledReview text={reviewRow[1].reviewText} name={reviewRow[1].name} date={reviewRow[1].date} userIcon={reviewRow[1].userIcon} key={(i*3)+2}/> : null}
          </FlexRow>
        );
      })}
    </FlexColumn>
  );
};

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;
