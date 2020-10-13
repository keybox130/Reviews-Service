import React from 'react';
import styled from 'styled-components';
import Highlighter from "react-highlight-words";
import StyledReviewText from './ReviewText.jsx';
import {
  FlexRow, FlexColumn, Fonts, Animation,
} from './Constants.jsx';

const ProfileImage = styled.img`
max-height: 56px;
display: inline-block;
border-radius: 50%;
mix-blend-mode: multiply;
`;

const Wrapper = styled.div`
line-height: 20px;
margin-left: 12px;
`;

const Name = styled.div`
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${Fonts.large};
`;

const Date = styled.div`
font-family: ${Fonts.family};
font-weight: ${Fonts.thin};
font-size: ${Fonts.small};
`;

const FlexContainer = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: column;
width: 477px;
margin-bottom: 40px;
margin-right: ${(props) => props.marginRight};
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
  animation-delay: ${(props) => props.delay}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}

&.effectSlideOutLeft
{
  animation: slideInLeft ${Animation.reviewSlideDuration}ms;
  animation-delay: ${(props) => props.delay}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}
`;

class Review extends React.Component {
  constructor({ text, name, month, year, userIcon, showAnimation, delay, isModal, callback, searchTerm }) {
    super();
    this.state = {
      fullText: text,
      text,
      name,
      date: `${month} ${year}`,
      userIcon,
      showAllText: true,
      isModal,
      mountRef: callback,
      searchTerm
    };

    this.className = showAnimation ? 'effectSlideInLeft' : null;
    this.delay = delay;
    this.onClick = this.onClick.bind(this);
    // add a ref for scroll bar DOM manipulation
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { mountRef } = this.state;
    if (mountRef) {
      mountRef(this.containerRef);
    }
    this.shortenText();
  }

  // reset shortened text to original on click
  onClick() {
    const { fullText } = this.state;
    this.setState({
      text: fullText,
      showAllText: true,
    });
  }

  // shortens the review text according to AirBnB style, if needed
  shortenText() {
    const { text, fullText } = this.state;
    const textCutoff = 180;
    const shouldShorten = text.length > textCutoff;

    if (shouldShorten) {
      // cut text to the nearest word
      const nearestWord = fullText.indexOf(' ', textCutoff);
      this.setState({
        text: `${fullText.slice(0, nearestWord)} `,
        showAllText: !shouldShorten,
      });
    }
  }

  render() {
    const {
      name, date, text, userIcon, showAllText, isModal, searchTerm
    } = this.state;

    const marginRight = isModal
      ? '100px'
      : '0';

    return (
      <FlexContainer marginRight={marginRight} className={this.className} delay={this.delay} ref={this.containerRef}>
        <FlexRow>
          <ProfileImage src={userIcon} />
          <FlexColumn>
            <Wrapper>
              <Name>
                <Highlighter
                  searchWords={[searchTerm]}
                  autoEscape
                  textToHighlight={name}
                />
              </Name>
              <Date>
                <Highlighter
                  searchWords={[searchTerm]}
                  autoEscape
                  textToHighlight={date}
                />
              </Date>
            </Wrapper>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <StyledReviewText text={text} onClick={this.onClick} expanded={showAllText} searchTerm={searchTerm} />
        </FlexRow>
      </FlexContainer>
    );
  }
}

const StyledReview = styled(Review)`
`;

export default StyledReview;
