import React from 'react';
import StyledReviewText from './ReviewText.jsx'
import styled from 'styled-components';
import {FlexRow, FlexColumn, Fonts, Animation} from './Constants.jsx';

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

const FlexContainer = styled.div.attrs(props =>
  ({className: props.className})
)`
display: flex;
flex-direction: column;
margin-left 3vw;
margin-right: 3vw;
width: 25vw;
margin-top: 3vh;

@keyframes slideInLeft {
  0% {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(-150px);
  }

  75% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
    filter: none;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  0% {
    opacity: 0;
    transform: translateX(0);
  }

  100% {
    opacity: 1;
    transform: translateX(-200px);
  }
}

&.effectSlideInLeft
{
  animation: slideInLeft ${Animation.reviewSlideDuration}ms;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}

&.effectSlideOutLeft
{
  animation: slideInLeft ${Animation.reviewSlideDuration}ms;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}

`;

class Review extends React.Component {
  constructor({text, name, date, userIcon, showAnimation, delay, callback}) {
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

    this.className = showAnimation ? 'effectSlideInLeft' : null;
    this.delay = delay;
    // add a ref for scroll bar DOM manipulation
    this.myRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.mountRef) {
      this.state.mountRef(this.myRef);
    }
    this.shortenText();
  }

  // reset shortened text to original on click
  onClick() {
    this.setState({
      text: this.state.fullText,
      showAllText: true,
    });
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

  render() {
    return (
      <FlexContainer className={this.className} delay={this.delay} ref={this.myRef}>
        <FlexRow>
          <ProfileImage src={this.state.userIcon} />
          <FlexColumn>
            <Name>{this.state.name}</Name>
            <Date>{this.state.date}</Date>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <StyledReviewText text={this.state.text} onClick={this.onClick.bind(this)} expanded={this.state.showAllText} />
        </FlexRow>
      </FlexContainer>
    );
  }
}

const StyledReview = styled(Review)`
`;

export default StyledReview;
