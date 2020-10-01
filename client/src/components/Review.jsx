import React from 'react';
import StyledReviewText from './ReviewText.jsx'
import styled from 'styled-components';
import fonts from './Fonts.js';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 5vh;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 3vw;
`;

const ProfileImage = styled.img`
max-height: 15vh;
display: inline-block;
border-radius: 50%;
`;

const Name = styled.p`
display: inline-block;
font-family: ${fonts.family};
font-weight: ${fonts.bold};
font-size: calc(18px + 1vw);
margin-top: 1vh;
margin-bottom: 1vh;
`;

const Date = styled.p`
display: inline;
font-family: ${fonts.family};
font-weight: ${fonts.thin};
font-size: calc(12px + 1vw);
margin-bottom: 1vh;
margin-top: 1vh;
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
max-width: 35vw;
`;

class Review extends React.Component {
  constructor({review, callback}) {
    super();
    this.state = {
      review: review,
      text: review.reviewText,
      showAllText: true,
      mountRef: callback ? callback : null
    }

    // add a ref for scroll bar DOM manipulation
    this.myRef = React.createRef();
  }

  componentWillMount() {
    if (this.state.mountRef) {
      this.state.mountRef(this.myRef);
    }
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
      <Container ref={this.myRef}>
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