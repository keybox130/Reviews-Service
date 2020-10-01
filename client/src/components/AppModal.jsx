import React from 'react';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphsModal from './RatingGraphsModal.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';
import styled from 'styled-components';
import fonts from './Fonts.js';

const Container = styled.div`
background-color: white;
border-style: solid;
border-width: 5px;
border-radius: 30px;
z-index: 2;
position: absolute;
display: flex;
margin: 20vw 20vh;

`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const CloseButton = styled.button`
  background-color: rgb(255, 255, 255);
  border-style: none;
  outline:none;
  font-weight: ${fonts.normal};
  font-family: ${fonts.family};
  font-size: calc(${fonts.small}px + 1vw);
  margin: 2vw 2vh;
  :hover {
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(247, 247, 247);
  }
`;

class AppModal extends React.Component {
  constructor({reviews, ratings, close}) {
    super();
    this.state = {
      reviews: reviews,
      ratings: ratings,
      close: close
    }
  }

  render() {
    return (
      <Container>
        <FlexColumn>
          <CloseButton onClick={this.state.close}>X</CloseButton>
        </FlexColumn>
        <FlexRow>
          <FlexColumn>
            <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} />
            <StyledRatingGraphsModal ratings={this.state.ratings}/>
          </FlexColumn>
          {/* render the full list */}
          <FlexColumn>
            <StyledReviewListModal reviews={this.state.reviews.sort()} />
          </FlexColumn>
        </FlexRow>
      </Container>
      );
  }
}

const StyledAppModal = styled(AppModal)`
`;

export default StyledAppModal;