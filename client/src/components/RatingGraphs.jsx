import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import {
  FlexColumn, Container,
} from './Constants.jsx';

const RatingGraphs = ({ ratings, isModal }) => {
  if (!isModal) {
    // render 2x3 bar graphs
    return (
      <>
        <FlexColumn>
          <Container>
            <StyledBarGraph text="Cleanliness" rating={ratings.cleanliness} />
            <StyledBarGraph text="Communication" rating={ratings.communication} />
            <StyledBarGraph text="Check-in" rating={ratings.checkIn} />
          </Container>
        </FlexColumn>
        <FlexColumn>
          <Container>
            <StyledBarGraph text="Accuracy" rating={ratings.accuracy} />
            <StyledBarGraph text="Location" rating={ratings.location} />
            <StyledBarGraph text="Value" rating={ratings.value} />
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
          <StyledBarGraph text="Cleanliness" rating={ratings.cleanliness} isModal />
          <StyledBarGraph text="Accuracy" rating={ratings.accuracy} isModal />
          <StyledBarGraph text="Communication" rating={ratings.communication} isModal />
          <StyledBarGraph text="Location" rating={ratings.location} isModal />
          <StyledBarGraph text="Check-in" rating={ratings.checkIn} isModal />
          <StyledBarGraph text="Value" rating={ratings.value} isModal />
        </Container>
      </FlexColumn>
    </>
  );
};

const StyledRatingGraphs = styled(RatingGraphs)`
`;

export default StyledRatingGraphs;
