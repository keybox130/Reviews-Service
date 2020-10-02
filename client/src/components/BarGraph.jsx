import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';
import {margins} from './Flex.jsx';

const OuterContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 4vh;
margin-left: ${margins.width};
`;

const InnerContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-left: ${margins.width};
`;

const Underlay = styled.div`
display: inline-block;
background-color: rgb(221,221,221);
height: 6px;
border-radius: 30px;
width: ${props => props.width}px;
`;

const Text = styled.p`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.normal};
font-size: ${fonts.large};
margin-left: 20px;
`;

const Bar = styled.div`
height: 6px;
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
        <Text>{text}</Text>
      <InnerContainer>
        <Underlay width={maxWidth}>
          <Bar width={proportion}></Bar>
        </Underlay>
        <Text>{rating}</Text>
      </InnerContainer>
    </OuterContainer>
  );
}

const StyledBarGraph = styled(BarGraph)`
`;

export default StyledBarGraph;