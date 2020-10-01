import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const Container = styled.div`
display: inline-block;
max-width: 100vw;
`;

const RatingGraphs = ({ratings}) => {
  return (
    <Container>
      <FlexRow>
        <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness}></StyledBarGraph>
        <StyledBarGraph text='Accuracy' rating={ratings.accuracy}></StyledBarGraph>
      </FlexRow>
      <FlexRow>
        <StyledBarGraph text='Communication' rating={ratings.communication}></StyledBarGraph>
        <StyledBarGraph text='Location' rating={ratings.location}></StyledBarGraph>
      </FlexRow>
      <FlexRow>
        <StyledBarGraph text='Check-in' rating={ratings.checkIn}></StyledBarGraph>
        <StyledBarGraph text='Value' rating={ratings.value}></StyledBarGraph>
      </FlexRow>
    </Container>
  );
}

const StyledRatingGraphs = styled(RatingGraphs)`
display: inline-block;
`;

export default StyledRatingGraphs;