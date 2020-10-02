import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';

const Button = styled.button`
border-radius: 10px;
color: rgb(34, 34, 34);
border-style: solid;
border-color: rgb(34, 34, 34);
background-color: white;
display: flex;
justify-content: center;
text-align: center;
padding: 13px 23px;
min-width: 15vw;
outline:none;
font-weight: ${fonts.normal};
font-family: ${fonts.family};
font-size: ${fonts.small};
transition-duration: 0.1s;
:hover{
  cursor: pointer;
  background-color: rgb(247, 247, 247);
}
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
max-width: 35vw;
`;

const ShowAll = ({numReviews, onClick}) => {
  return (
    <Container>
      <Button onClick={onClick}>{`Show all ${numReviews} reviews`}</Button>
    </Container>
  );
}

const StyledShowAll = styled(ShowAll)`
`;

export default StyledShowAll;