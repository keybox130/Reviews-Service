import React from 'react';
import StyledReviewText from './ReviewText.jsx'
import styled from 'styled-components';
import {FlexRow, FlexColumn, Container, Fonts} from './Constants.jsx';

const ProfileImage = styled.img`
max-height: 7vh;
display: inline-block;
border-radius: 50%;
mix-blend-mode: multiply;
`;

const Name = styled.p`
display: inline-block;
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${Fonts.large};
margin-top: 10px;
`;

const Date = styled.p`
display: inline;
font-family: ${Fonts.family};
font-weight: ${Fonts.thin};
font-size: ${Fonts.small};
margin-bottom: 20px;
margin-top: -15px;
`;

class Review extends React.Component {
  constructor({text, name, date, userIcon, callback}) {
    super();
    this.state = {
      fullText: text,
      text: text,
      name: name,
      date: date,
      userIcon: userIcon,
      showAllText: true,
      mountRef: callback ? callback : null
    }

    // add a ref for scroll bar DOM manipulation
    this.myRef = React.createRef();
  }

  componentDidMount() {
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
      let nearestWord = this.state.fullText.indexOf(' ', textCutoff);
      this.setState({
        text: this.state.fullText.slice(0, nearestWord) + ' ',
        showAllText: !shouldShorten
      });
    }
  }

  // reset shortened text to original on click
  onClick() {
    this.setState({
      text: this.state.fullText,
      showAllText: true
    });
  }

  render() {
    return (
      <Container ref={this.myRef}>
        <FlexRow>
          <ProfileImage src={this.state.userIcon}></ProfileImage>
          <FlexColumn>
            <Name>{this.state.name}</Name>
            <Date>{this.state.date}</Date>
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
`;

export default StyledReview;