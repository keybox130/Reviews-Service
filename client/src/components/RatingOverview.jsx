import React from 'react';
import styled from 'styled-components';
import {FlexRow, Container, Fonts, Margins} from './Constants.jsx';

const Header = styled.h1`
display: inline-block;
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${props => props.fontSize};
margin-bottom: -5vh;
`;

const Overlay = styled.div`
display: flex;
background-color: rgb(221,221,221);
`

const Star = styled.img`
display: inline-block;
mix-blend-mode: multiply;
margin-left: ${props => props.marginLeft};
margin-right: 25px;
max-width: ${props => props.imageSize};
`;

const RatingOverview = ({average, numReviews, isModal}) => {
  // size of text/star depends on whether this is a modal or not
  const fontSize = isModal ? Fonts.largeHeader : Fonts.header;
  const imageSize = isModal ? Margins.modalImageSize : Margins.imageSize;
  const marginLeft = isModal ? `10px` : `15px`;
  return (
    <FlexRow>
      <Container className='header'>
        <Overlay></Overlay>
        <Star marginLeft={marginLeft} imageSize={imageSize} src="/static/star.png" />
        <Header marginLeft={marginLeft} fontSize={fontSize}>{`${average} (${numReviews} reviews)`}</Header>
      </Container>
    </FlexRow>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
`;

export default StyledRatingOverview;