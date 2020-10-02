import React from 'react';
import styled from 'styled-components';
import StyledBarGraph from './BarGraph.jsx';
import {FlexColumn, FlexRow, Container} from './Constants.jsx';

const RatingGraphs = ({ratings, isModal}) => {
  if (!isModal) {
    // render 2x3 bar graphs
    return (
    <>
      <FlexColumn>
        <Container>
          <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={false}></StyledBarGraph>
          <StyledBarGraph text='Communication' rating={ratings.communication} isModal={false}></StyledBarGraph>
          <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={false}></StyledBarGraph>
        </Container>
      </FlexColumn>
      <FlexColumn>
        <Container>
          <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={false}></StyledBarGraph>
          <StyledBarGraph text='Location' rating={ratings.location} isModal={false}></StyledBarGraph>
          <StyledBarGraph text='Value' rating={ratings.value} isModal={false}></StyledBarGraph>
        </Container>
      </FlexColumn>
    </>
    );
  } else {
    // render 1x6 bar graphs
    return (
      <>
        <FlexColumn>
          <Container>
            <StyledBarGraph text='Cleanliness' rating={ratings.cleanliness} isModal={true}></StyledBarGraph>
            <StyledBarGraph text='Accuracy' rating={ratings.accuracy} isModal={true}></StyledBarGraph>
            <StyledBarGraph text='Communication' rating={ratings.communication} isModal={true}></StyledBarGraph>
            <StyledBarGraph text='Location' rating={ratings.location} isModal={true}></StyledBarGraph>
            <StyledBarGraph text='Check-in' rating={ratings.checkIn} isModal={true}></StyledBarGraph>
            <StyledBarGraph text='Value' rating={ratings.value} isModal={true}></StyledBarGraph>
          </Container>
        </FlexColumn>
      </>
    );
  }
}

const StyledRatingGraphs = styled(RatingGraphs)`
`;

export default StyledRatingGraphs;