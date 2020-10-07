import React from 'react';
import styled from 'styled-components';
import {
  Fonts, Animation,
} from './Constants.jsx';

const Magnifier = styled.svg`
display: flex;
height: 16px;
max-width: 50%;
margin-right: 8px;
stroke: currentcolor;
stroke-width: 3;
`;

const Input = styled.input`
cursor: text !important;
border: none;
outline: none;
color: rgb(34, 34, 34);
background-color: transparent;
font-family: ${Fonts.family};
font-size: ${Fonts.large};
font-weight: ${Fonts.normal};
line-height: 20px;
flex: 1 1 0%;
text-overflow: ellipsis;
`;

const SearchContainer = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
margin-left: -7vw;
margin-top: -4vh;
border: none;
color: rgb(34, 34, 34);
background-color: rgb(247, 247, 247);
align-items: center;
padding: 12px 12px 12px 16px;
border-radius: 100px;
box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset;
min-width: 70%;

@keyframes expandSearch {
  0% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

@keyframes shrinkSearch {
  0% {
    width: 100%;
  }
  100% {
    width: 70%;
  }
}

&.hasFocus {
  animation-name: expandSearch;
  animation-duration: ${Animation.searchExpandDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}

&.lostFocus {
  animation-name: shrinkSearch;
  animation-duration: ${Animation.searchExpandDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.0, 0.0, 0.0, 1.0);
}
`;

class SearchBar extends React.Component {
  constructor({ callback }) {
    super();
    this.state = {
      focus: null,
    };
    this.expand = this.expand.bind(this);
    this.shrink = this.shrink.bind(this);
    this.searchCallback = callback;
  }

  // expand the search bar
  expand() {
    this.setState({
      focus: 'hasFocus',
    });
  }

  // shrink the search bar
  shrink() {
    this.setState({
      focus: 'lostFocus',
    });
  }

  render() {
    let delay = Number(Animation.dimDuration) + Number(Animation.modalSlideDuration);
    delay = delay.toString();

    const { focus } = this.state;

    return (
      <SearchContainer className={focus} delay={delay}>
        {/* Magnifier SVG */}
        <Magnifier
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
          </g>
        </Magnifier>
        <Input placeholder="Search reviews..." autocomplete="off" type="text" onFocus={this.expand} onBlur={this.shrink} onChange={this.searchCallback} />
      </SearchContainer>
    );
  }
}

const StyledSearchBar = styled(SearchBar)`
`;

export default StyledSearchBar;
