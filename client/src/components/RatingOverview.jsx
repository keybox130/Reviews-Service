import React from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
`;

const Text = styled.p`
display: inline-block;
font-family: 'Nunito', sans-serif;
font-weight: 600;
font-size: calc(18px + 1vw);
margin-top: 3vh;
margin-bottom: 1vh;
`;

const RatingOverview = () => {
  return (
    <Container>
      <FlexRow>
        <Text></Text>
      </FlexRow>
    </Container>
  );
}

export default RatingOverview;