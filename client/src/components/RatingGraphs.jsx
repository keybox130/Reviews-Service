import React from 'react';
import StyledBarGraph from './BarGraph.jsx';
import styled from 'styled-components';
import {FlexColumn, Container} from './Constants.jsx';

const RatingGraphs = ({ratings, isModal}) => {
  if (!isModal) {
    // render 2x3 bar graphs
    return (
      <>
        <FlexColumn>
          <Container>
            <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={false} />
            <StyledBarGraph text='Communication' rating={ratings.communication} isModal={false} />
            <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={false} />
          </Container>
        </FlexColumn>
        <FlexColumn>
          <Container>
            <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={false} />
            <StyledBarGraph text='Location' rating={ratings.location} isModal={false} />
            <StyledBarGraph text='Value' rating={ratings.value} isModal={false} />
          </Container>
        </FlexColumn>
      </>
    );
  }
  // render 1x6 bar graphs
  return (
    <>
      <FlexColumn>
        <Container>
          <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={true} />
          <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={true} />
          <StyledBarGraph text='Communication' rating={ratings.communication} isModal={true} />
          <StyledBarGraph text='Location' rating={ratings.location} isModal={true} />
          <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={true} />
          <StyledBarGraph text='Value' rating={ratings.value} isModal={true} />
        </Container>
      </FlexColumn>
    </>
  );
};

const StyledRatingGraphs = styled(RatingGraphs)`
`;

export default StyledRatingGraphs;