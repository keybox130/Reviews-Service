import React from 'react';
import styled from 'styled-components';
import {
  FlexRow, Container, Fonts, Animation, Margins,
} from './Constants.jsx';

const Header = styled.h1.attrs((props) =>({ className: props.className }))`
position: absolute;
display: inline-block;
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${(props) => props.fontSize};
margin-bottom: -5vh;
margin-left: 45px;
&.modal {
  margin-left: 65px;
}
`;

const StarUnderlay = styled.img.attrs((props) => ({ className: props.className }))`
display: inline-block;
position: absolute;
z-index: 0;
filter: grayscale(100%);
mix-blend-mode: multiply;
margin-top: 22px;
margin-left: 15px;
width: ${(props) => props.imageSize};
height: ${(props) => props.imageSize};
margin-left: 15px;
`;

const Star = styled.img.attrs((props) => ({ className: props.className }))`
display: inline-block;
z-index: 1;
position: absolute;
margin-top: 22px;
width: ${(props) => props.imageSize};
height: ${(props) => props.imageSize};
margin-left: 15px;

@keyframes loadStar {
  0% {
    clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%);
    opacity: 1;
  }
  100% {
    clip-path: polygon(0% 0%, 0% 100%, ${(props) => props.percentage}% 100%, ${(props) => props.percentage}% 0%);
    opacity: 1;
  }
}

animation-name: loadStar;
animation-duration: ${Animation.starLoadDuration}ms;
animation-fill-mode: both;
animation-timing-function: ease-out;

&.modal {
  /* start star load animation after modal finishes displaying */
  animation-delay: ${Number(Animation.barDuration) + Number(Animation.dimDuration)}ms;
}
`;

const RatingOverview = ({ average, numReviews, isModal }) => {
  // size of text/star depends on whether this is a modal or not
  const fontSize = isModal ? Fonts.largeHeader : Fonts.header;
  const imageSize = isModal ? Margins.modalImageSize : Margins.imageSize;
  const className = isModal ? 'modal' : null;
  // get percentage of star to render
  const percentage = Math.round((average / 5.0) * 100).toString();
  return (
    <FlexRow>
      <Container className="header">
        <StarUnderlay className={className} imageSize={imageSize} src="/reviews-static/star.png" />
        <Star className={className} percentage={percentage} imageSize={imageSize} src="/reviews-static/star.png" />
        <Header className={className} fontSize={fontSize}>{`${average} (${numReviews} reviews)`}</Header>
      </Container>
    </FlexRow>
  );
};

const StyledRatingOverview = styled(RatingOverview)`
`;

export default StyledRatingOverview;
