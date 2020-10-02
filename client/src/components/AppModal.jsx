import React from 'react';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';
import styled from 'styled-components';
import {Fonts, FlexRow, FlexColumn} from './Constants.jsx';

const ReviewModal = styled.div`
z-index: 2;
position: absolute;
display: flex;
flex-direction: row;
justify-content: space-around;
background-color: white;
border-style: none;
border-width: 5px;
border-radius: 20px;
height: 80vh;
width: 70vw;
margin: 5vh 15vw;
padding-top: 5vh;
`;

const CloseButton = styled.button`
  background-color: rgb(255, 255, 255);
  border-style: none;
  outline:none;
  font-weight: ${Fonts.normal};
  font-family: ${Fonts.family};
  font-size: ${Fonts.large};
  margin-top: -2vh;
  :hover {
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(247, 247, 247);
  }
`;

class AppModal extends React.Component {
  constructor({reviews, ratings, close, callback}) {
    super();
    this.state = {
      reviews: reviews,
      ratings: ratings,
      close: close
    }
  }

  render() {
    return (
      <ReviewModal>
        <FlexColumn>
          <CloseButton onClick={this.state.close}>x</CloseButton>
        </FlexColumn>
        <FlexColumn>
          <StyledRatingOverview average={this.state.ratings.average} numReviews={this.state.reviews.length} isModal={true}/>
          <StyledRatingGraphs ratings={this.state.ratings} isModal={true}/>
        </FlexColumn>
        {/* render the full list */}
        <FlexColumn>
          <StyledReviewListModal reviews={this.state.reviews.sort()} />
        </FlexColumn>
      </ReviewModal>
      );
  }
}

const StyledAppModal = styled(AppModal)`
`;

export default StyledAppModal;