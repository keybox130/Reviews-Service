import React from 'react';
import styled from 'styled-components';
import { Margins, Text, Animation } from './Constants.jsx';

const OuterContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 4vh;
margin-right: ${(props) => props.rightMargin};
`;

const InnerContainer = styled.div`
display: flex;
align-items: center;
`;

const Underlay = styled.div`
display: flex;
align-self: flex-start;
margin-top: 10px;
background-color: rgb(221,221,221);
height: ${Margins.barHeight};
mix-blend-mode: multiply;
border-radius: 30px;
min-width: ${(props) => props.width}px;
`;

const Bar = styled.div.attrs((props) => ({ className: props.className }))`
height: ${Margins.barHeight};
display: inline-block;
mix-blend-mode: multiply;
border-radius: 30px;
background-color: black;
min-width: ${(props) => props.width}px;

@keyframes loadRating {
  0% {
    opacity: 0;
    min-width: 0px;
  }
  100% {
    opacity: 1;
  }
}

animation-name: loadRating;
animation-duration: ${Animation.modalSlideDuration}ms;
animation-fill-mode: both;
animation-timing-function: ease-out;

&.modal {
  /* start bar load animation after modal finishes displaying */
  animation-delay: ${Number(Animation.barDuration) + Number(Animation.dimDuration)}ms;
}

`;

const BarGraph = ({ text, rating, isModal }) => {
  const maxWidth = isModal
    ? Margins.modalBarWidth
    : Margins.barWidth; // width in px for higher accuracy
  const rightMargin = isModal
    ? '10vw'
    : '0';
  // bar width
  const proportion = Math.floor((rating / 5.0) * Number(maxWidth));
  // whether to delay bar load animation for modal
  const className = isModal ? 'modal' : null;
  rating = rating.toFixed(1);

  return (
    <OuterContainer rightMargin={rightMargin}>
      <Text>{text}</Text>
      <InnerContainer>
        <Underlay width={maxWidth}>
          <Bar width={proportion.toString()} className={className} />
        </Underlay>
        <Text className="rating">{rating}</Text>
      </InnerContainer>
    </OuterContainer>
  );
};

const StyledBarGraph = styled(BarGraph)`
`;

export default StyledBarGraph;
