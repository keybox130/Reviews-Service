import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';
import {FlexRow, FlexColumn, margins} from './Constants.jsx';

const Header = styled.h1`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.bold};
font-size: ${fonts.header};
margin-top: 4vh;
margin-left: 1vw;
`;

const Star = styled.img`
max-height: 2vh;
margin-top: 18px;
margin-left: ${margins.width};
object-fit: contain;
align-self: center;
flex: 0 0 auto;
`;

const RatingOverview = ({average, numReviews}) => {
  return (
    <FlexColumn>
      <FlexRow>
        <Star src='/static/star.png'></Star>
        <Header>{`${average} (${numReviews} reviews)`}</Header>
      </FlexRow>
    </FlexColumn>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
display: inline-block;
`;

export default StyledRatingOverview;