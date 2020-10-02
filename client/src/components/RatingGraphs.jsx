import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import {FlexColumn, FlexRow} from './Flex.jsx';

const Container = styled.div`
display: inline-block;
max-width: 100vw;
`;

const RatingGraphs = ({ratings}) => {
  return (
    <Container>
      <FlexRow>
        <FlexColumn>
          <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness}></StyledBarGraph>
          <StyledBarGraph text='Communication' rating={ratings.communication}></StyledBarGraph>
          <StyledBarGraph text='Check-in' rating={ratings.checkIn}></StyledBarGraph>
        </FlexColumn>
        <FlexColumn>
          <StyledBarGraph text='Accuracy' rating={ratings.accuracy}></StyledBarGraph>
          <StyledBarGraph text='Location' rating={ratings.location}></StyledBarGraph>
          <StyledBarGraph text='Value' rating={ratings.value}></StyledBarGraph>
        </FlexColumn>
      </FlexRow>
    </Container>
  );
}

const StyledRatingGraphs = styled(RatingGraphs)`
display: inline-block;
`;

export default StyledRatingGraphs;