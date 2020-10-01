import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';

const OuterContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
margin: 0 5vw;
height: 10vh;
min-width: 32vw;
`;

const InnerContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 2vw;
min-width: 30vw;
`;

const Underlay = styled.div`
display: inline-block;
background-color: rgb(221,221,221);
height: 1vh;
border-radius: 30px;
width: ${props => props.width}px;
`;

const Text = styled.p`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.normal};
font-size: calc(14px + 1vw);
`;

const Bar = styled.div`
height: 1vh;
display: flex;
width: ${props => props.width}px;
border-radius: 30px;
background-color: black;
`;

const BarGraph = ({text, rating}) => {
  const maxWidth = 200; // width in px for higher accuracy
  const proportion = Math.floor((rating / 5.0) * maxWidth);
  rating = rating.toFixed(1);
  return (
    <OuterContainer>
      <InnerContainer>
        <Text>{text}</Text>
        <Underlay width={maxWidth}>
          <Bar width={proportion}></Bar>
        </Underlay>
      </InnerContainer>
        <Text>{rating}</Text>
    </OuterContainer>
  );
}

const StyledBarGraph = styled(BarGraph)`
`;

export default StyledBarGraph;