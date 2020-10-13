import React from 'react';
import styled from 'styled-components';
import StyledReview from './Review.jsx';
import {
  FlexRow,
} from './Constants.jsx';

const FlexContainer = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: row;
justify-content: space-between;
min-width: 1120px;
`;

const FlexColumn = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: column;
margin-top: 35px;
`;

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
          <FlexContainer key={i*3}>
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
                  key={(i*3)+2}
                />
              )
              : null}
          </FlexContainer>
        );
      })}
    </FlexColumn>
  );
};

const StyledReviewList = styled(ReviewList)`
`;

export default StyledReviewList;
