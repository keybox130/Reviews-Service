import React from 'react';
import styled from 'styled-components';
import StyledReview from './Review.jsx';
import {
  FlexRow, FlexColumn,
} from './Constants.jsx';

const ReviewList = ({ reviews }) => {
  const reviewRows = [];

  // split reviews into rows
  for (let i = 0; i < reviews.length; i += 2) {
    reviewRows.push(reviews.slice(i, i+2));
  }

  return (
    <FlexColumn>
      {reviewRows.map((reviewRow, i) => {
        return (
          <FlexRow key={i*3}>
            <StyledReview
              text={reviewRow[0].reviewText}
              name={reviewRow[0].name}
              month={reviewRow[0].month}
              year={reviewRow[0].year}
              userIcon={reviewRow[0].userIcon}
              key={(i*3)+1}
            />
            {/* Only render last review if number of reviews isn't odd */}
            {reviewRow.length === 2
              ? (
                <StyledReview
                  text={reviewRow[1].reviewText}
                  name={reviewRow[1].name}
                  month={reviewRow[1].month}
                  year={reviewRow[1].year}
                  userIcon={reviewRow[1].userIcon}
                  key={(i*3)+2} />
              )
              : null}
          </FlexRow>
        );
      })}
    </FlexColumn>
  );
};

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;
