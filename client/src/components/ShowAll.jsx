import React from 'react';
import styled from 'styled-components';
import {FlexColumn, Container, Fonts} from './Constants.jsx';

const Button = styled.button.attrs(props => {
  return {
    className: props.className
  }
})`
border-radius: 8px;
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
max-height: 8vh;
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

&.clicked {

}

`;

const ShowAll = ({numReviews, onClick}) => {

  let className = null;

  const click = (e) => {
    className = `clicked`;
    onClick(e);
  }

  return (
    <FlexColumn>
      <Container>
        <Button onClick={click} className={className}>{`Show all ${numReviews} reviews`}</Button>
      </Container>
    </FlexColumn>
  );
}

const StyledShowAll = styled(ShowAll)`
`;

export default StyledShowAll;