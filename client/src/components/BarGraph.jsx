import React from 'react';
import styled from 'styled-components';
import {margins, Text, Fonts, animation} from './Constants.jsx';

const OuterContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 4vh;
margin-right: ${props => props.rightMargin};
`;

const InnerContainer = styled.div`
display: flex;
align-items: center;
`;

const Underlay = styled.div`
display: flex;
background-color: rgb(221,221,221);
height: ${margins.barHeight};
mix-blend-mode: multiply;
border-radius: 30px;
min-width: ${props => props.width}px;
`;

const Bar = styled.div`
height: ${margins.barHeight};
display: flex;
mix-blend-mode: multiply;
border-radius: 30px;
background-color: black;
min-width: ${props => props.width}px;

@keyframes expand {
  0% {
    opacity: 0;
    min-width: 0px;
  }
  100% {
    opacity: 1;
  }
}

animation-name: expand;
animation-duration: ${animation.slideDuration}ms;
animation-fill-mode: forwards;
/* should start animation after dim/blur animation completes */
animation-timing-function: ease-out;
}

`;

const BarGraph = ({text, rating, isModal}) => {
  const maxWidth = isModal ? margins.modalBarWidth : margins.barWidth; // width in px for higher accuracy
  const rightMargin = isModal ? `10vw` : `0`;
  const proportion = Math.floor((rating / 5.0) * maxWidth);
  rating = rating.toFixed(1);
  return (
    <OuterContainer rightMargin={rightMargin}>
        <Text>{text}</Text>
      <InnerContainer>
        <Underlay width={maxWidth}>
          <Bar width={proportion}></Bar>
        </Underlay>
        <Text className='rating'>{rating}</Text>
      </InnerContainer>
    </OuterContainer>
  );
}

const StyledBarGraph = styled(BarGraph)`
`;

export default StyledBarGraph;