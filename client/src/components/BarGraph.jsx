import React from 'react';
import styled from 'styled-components';
import {margins, Text, Fonts} from './Constants.jsx';

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
z-index: 1;
mix-blend-mode: multiply;
border-radius: 30px;
min-width: ${props => props.width}px;
`;

const Bar = styled.div`
height: ${margins.barHeight};
display: flex;
z-index: 2;
mix-blend-mode: multiply;
min-width: ${props => props.width}px;
border-radius: 30px;
background-color: black;
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