import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.img`
display: inline-block;
max-width: 10%;
border-radius: 50%;
object-fit: contain;
align-self: center;
flex: 0 0 auto;
`;

const Name = styled.p`
display: inline-block;
font-family: 'Nunito', sans-serif;
font-weight: 600;
`;

const Date = styled.p`
display: inline-block;
font-family: 'Nunito', sans-serif;
font-weight: 300;
`;

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
`;

const Review = ( {review} ) => {
  return (
    <FlexRow>
      <ProfileImage src={review.userIcon}></ProfileImage>
      <FlexColumn>
        <Name>{review.name}</Name>
        <Date>{review.date}</Date>
      </FlexColumn>
    </FlexRow>
  );
}

const StyledReview = styled(Review)`
display: inline-block;
margin: 5% auto;
`;

export default StyledReview;