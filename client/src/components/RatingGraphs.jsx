import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import { FlexColumn, Container } from './Constants.jsx';

const LeftContainer = styled.div.attrs((props) => ({ className: props.className }))`
display: inline-block;
margin-top: 1vh;
margin-left: 3vw;
width: 25vw;
}
`;

const RightContainer = styled.div.attrs((props) => ({ className: props.className }))`
display: inline-block;
margin-top: 1vh;
margin-left: 5vw;
width: 25vw;
}
`;

const RatingGraphs = ({ ratings, isModal }) => {
  if (!isModal) {
    // render 2x3 bar graphs
    return (
      <>
        <FlexColumn>
          <LeftContainer>
            <StyledBarGraph text="Cleanliness" rating={ratings.cleanliness} />
            <StyledBarGraph text="Communication" rating={ratings.communication} />
            <StyledBarGraph text="Check-in" rating={ratings.checkIn} />
          </LeftContainer>
        </FlexColumn>
        <FlexColumn>
          <RightContainer>
            <StyledBarGraph text="Accuracy" rating={ratings.accuracy} />
            <StyledBarGraph text="Location" rating={ratings.location} />
            <StyledBarGraph text="Value" rating={ratings.value} />
          </RightContainer>
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
