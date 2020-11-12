import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import { FlexColumn, Container } from './Constants.jsx';

const FlexContainer = styled.div.attrs((props) => ({ className: props.className }))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 1120px;
`;

const RatingGraphs = ({ ratings, isModal }) => {
  if (!isModal) {
    // render 2x3 bar graphs
    return (
      <FlexColumn>
        <FlexContainer>
          <StyledBarGraph text="Cleanliness" rating={ratings.cleanliness} />
          <StyledBarGraph text="Accuracy" rating={ratings.accuracy} />
        </FlexContainer>
        <FlexContainer>
          <StyledBarGraph text="Communication" rating={ratings.communication} />
          <StyledBarGraph text="Location" rating={ratings.location} />
        </FlexContainer>
        <FlexContainer>
          <StyledBarGraph text="Check-in" rating={ratings.checkIn} />
          <StyledBarGraph text="Value" rating={ratings.value} />
        </FlexContainer>
      </FlexColumn>
    );
  }
  // render 1x6 bar graphs
  return (
    <>
      <FlexColumn className="modal">
        <StyledBarGraph text="Cleanliness" rating={ratings.cleanliness} isModal />
        <StyledBarGraph text="Accuracy" rating={ratings.accuracy} isModal />
        <StyledBarGraph text="Communication" rating={ratings.communication} isModal />
        <StyledBarGraph text="Location" rating={ratings.location} isModal />
        <StyledBarGraph text="Check-in" rating={ratings.checkIn} isModal />
        <StyledBarGraph text="Value" rating={ratings.value} isModal />
      </FlexColumn>
    </>
  );
};

const StyledRatingGraphs = styled(RatingGraphs)``;

export default StyledRatingGraphs;
