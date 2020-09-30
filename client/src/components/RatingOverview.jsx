import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
`;

const Header = styled.h1`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.bold};
font-size: calc(24px + 1vw);
margin-top: 4vh;
`;

const Star = styled.img`
max-height: 4vh;
margin: 4vh 2vw;
object-fit: contain;
align-self: center;
flex: 0 0 auto;
`;

const RatingOverview = ({average, numReviews}) => {
  return (
    <Container>
      <FlexRow>
        <Star src='/static/star.jpg'></Star>
        <Header>{`${average} (${numReviews} reviews)`}</Header>
      </FlexRow>
    </Container>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
display: inline-block;
`;

export default StyledRatingOverview;