import React from 'react';
import StyledReviewText from './ReviewText.jsx'
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 3vw;
`;

const ProfileImage = styled.img`
max-height: 30vh;
display: inline-block;
border-radius: 50%;
object-fit: contain;
align-self: center;
flex: 0 0 auto;
`;

const Name = styled.p`
display: inline-block;
font-family: 'Nunito', sans-serif;
font-weight: 600;
font-size: calc(18px + 1vw);
margin-top: 3vh;
margin-bottom: 1vh;
`;

const Date = styled.p`
display: inline;
font-family: 'Nunito', sans-serif;
font-weight: 200;
font-size: calc(12px + 1vw);
margin-bottom: 1vh;
margin-top: 1vh;
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
`;

class Review extends React.Component {
  constructor({review}) {
    super();
    this.state = {
      review: review,
      text: review.reviewText,
      showAllText: true
    }

  }

  componentDidMount() {
    this.shortenText();
  }

  // shortens the review text according to AirBnB style, if needed
  shortenText() {
    const textCutoff = 180;
    const shouldShorten = this.state.text.length > textCutoff;

    if (shouldShorten) {
      // cut text to the nearest word
      let nearestWord = this.state.text.indexOf(' ', textCutoff);
      this.setState({
        text: this.state.text.slice(0, nearestWord) + ' ',
        showAllText: !shouldShorten
      });
    }
  }

  // reset shortened text to original on click
  onClick() {
    this.setState({
      text: this.state.review.reviewText,
      showAllText: true
    });
  }

  render() {
    return (
      <Container>
        <FlexRow>
          <ProfileImage src={this.state.review.userIcon}></ProfileImage>
          <FlexColumn>
            <Name>{this.state.review.name}</Name>
            <Date>{this.state.review.date}</Date>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <StyledReviewText text={this.state.text} onClick={this.onClick.bind(this)} expanded={this.state.showAllText}/>
        </FlexRow>
      </Container>
    );
  }
}

const StyledReview = styled(Review)`
display: inline-block;
`;

export default StyledReview;