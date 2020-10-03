import React from 'react';
import StyledRatingOverview from './RatingOverview.jsx';
import StyledRatingGraphs from './RatingGraphs.jsx';
import StyledReviewListModal from './ReviewListModal.jsx';
import styled from 'styled-components';
import {Fonts, FlexColumn, Container} from './Constants.jsx';

const ReviewModal = styled.div`
z-index: 2;
position: absolute;
display: flex;
flex-direction: row;
justify-content: flex-start;
background-color: white;
border-style: none;
border-width: 5px;
border-radius: 15px;
height: 80vh;
max-width: 60vw;
margin: 5vh 20vw;
padding-top: 5vh;
`;

const CloseButton = styled.button`
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  border-style: none;
  display: flex;
  justify-content: center;
  text-align: center;
  max-height: 10vh;
  margin-left: -8px;
  padding: 13px 23px;
  outline:none;
  font-weight: ${Fonts.normal};
  font-family: ${Fonts.family};
  font-size: ${Fonts.header};
  :hover {
    cursor: pointer;
    background-color: rgb(247, 247, 247);
  }
`;

// const CloseButton = styled.button`
// border-radius: 10px;
// color: rgb(34, 34, 34);
// border-style: solid;
// border-color: rgb(34, 34, 34);
// background-color: white;
// display: flex;
// justify-content: center;
// text-align: center;
// padding: 13px 23px;
// margin-left: -1vw;
// max-width: 12vw;
// outline:none;
// font-weight: ${Fonts.bold};
// font-family: ${Fonts.family};
// font-size: ${Fonts.large};
// transition-duration: 0.5s;
// :hover{
//   cursor: pointer;
//   background-color: rgb(247, 247, 247);
// }
// `;

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
        <FlexColumn className='modal'>
          <Container>
            <CloseButton onClick={this.state.close}>x</CloseButton>
          </Container>
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