import React from 'react';
import styled from 'styled-components';
import {FlexColumn, Container, Fonts} from './Constants.jsx';

const Button = styled.button`
border-radius: 10px;
color: rgb(34, 34, 34);
border-style: solid;
border-width: 1px;
border-color: rgb(34, 34, 34);
background-color: white;
display: flex;
justify-content: center;
text-align: center;
padding: 13px 23px;
margin-left: -1vw;
max-width: 12vw;
outline:none;
font-weight: ${Fonts.bold};
font-family: ${Fonts.family};
font-size: ${Fonts.large};
transition-duration: 0.5s;
cursor: pointer;
mix-blend-mode: multiply;
:hover{
  background-color: rgb(247, 247, 247);
}
`;

const ShowAll = ({numReviews, onClick}) => {
  return (
    <FlexColumn>
      <Container>
        <Button onClick={onClick}>{`Show all ${numReviews} reviews`}</Button>
      </Container>
    </FlexColumn>
  );
}

const StyledShowAll = styled(ShowAll)`
`;

export default StyledShowAll;