import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';
import {FlexRow} from './Flex.jsx';

const Container = styled.div`
margin: 1vh 2vw;
display: flex;
`;

const Header = styled.h1`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.bold};
font-size: ${fonts.header};
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
        <Star src='/static/star.png'></Star>
        <Header>{`${average} (${numReviews} reviews)`}</Header>
      </FlexRow>
    </Container>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
display: inline-block;
`;

export default StyledRatingOverview;