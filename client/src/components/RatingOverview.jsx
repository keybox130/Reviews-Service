import React from 'react';
import styled from 'styled-components';
import {FlexRow, Container, Fonts, Animation, Margins} from './Constants.jsx';

const Header = styled.h1`
display: inline-block;
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${props => props.fontSize};
margin-bottom: -5vh;
`;

const Overlay = styled.div`
display: absolute;
background-color: rgb(255,0,0);
opacity: 0.5;
width: 1000px;
height: 100px;
overflow: hidden;
`

const Star = styled.img`
display: inline-block;
mix-blend-mode: multiply;
margin-left: ${props => props.marginLeft};
margin-right: 15px;
width: ${props => props.imageSize};
height: ${props => props.imageSize};

@keyframes loadStar {
  0% {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
    opacity: 0;
  }
  100% {
    clip-path: polygon(0% 0%, 0% 100%, ${props => props.percentage}% 100%, ${props => props.percentage}% 0%);
    opacity: 1;
  }
}

animation-name: loadStar;
animation-duration: ${Animation.modalSlideDuration}ms;
animation-fill-mode: both;
animation-timing-function: ease-out;

&.modal {
  /* start star load animation after modal finishes displaying */
  animation-delay: ${Number(Animation.barDuration) + Number(Animation.dimDuration)}ms;
}

`;

const RatingOverview = ({average, numReviews, isModal}) => {
  // size of text/star depends on whether this is a modal or not
  const fontSize = isModal ? Fonts.largeHeader : Fonts.header;
  const imageSize = isModal ? Margins.modalImageSize : Margins.imageSize;
  const marginLeft = isModal ? `10px` : `15px`;
  const className = isModal ? `modal` : null;
  // get percentage of star to render
  const percentage = Math.round((average / 5.0) * 100);
  return (
    <FlexRow>
      <Container className='header'>
        <Star className={className} marginLeft={marginLeft} percentage={percentage} imageSize={imageSize} src="/static/star.png" />
        <Header marginLeft={marginLeft} fontSize={fontSize}>{`${average} (${numReviews} reviews)`}</Header>
      </Container>
    </FlexRow>
  );
}

const StyledRatingOverview = styled(RatingOverview)`
`;

export default StyledRatingOverview;