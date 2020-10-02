import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import {FlexColumn, FlexRow, Container} from './Constants.jsx';

const RatingGraphs = ({ratings}) => {
  return (
      <FlexRow>
        <FlexColumn>
          <Container>
            <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness}></StyledBarGraph>
            <StyledBarGraph text='Communication' rating={ratings.communication}></StyledBarGraph>
            <StyledBarGraph text='Check-in' rating={ratings.checkIn}></StyledBarGraph>
          </Container>
        </FlexColumn>
        <FlexColumn>
          <Container>
            <StyledBarGraph text='Accuracy' rating={ratings.accuracy}></StyledBarGraph>
            <StyledBarGraph text='Location' rating={ratings.location}></StyledBarGraph>
            <StyledBarGraph text='Value' rating={ratings.value}></StyledBarGraph>
          </Container>
        </FlexColumn>
      </FlexRow>
  );
}

const StyledRatingGraphs = styled(RatingGraphs)`
display: inline-block;
`;

export default StyledRatingGraphs;