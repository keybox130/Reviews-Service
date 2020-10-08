import React from 'react';
import styled from 'styled-components';
import {
  FlexColumn, Container, Animation, Fonts,
} from './Constants.jsx';

const Button = styled.button.attrs((props) => ({ className: props.className }))`
border-radius: 8px;
color: rgb(34, 34, 34);
border-style: solid;
border-width: 1px;
border-color: rgb(34, 34, 34);
background-color: white;
display: flex;
justify-content: center;
text-align: center;
white-space: nowrap;
flex: 0 0 auto;
padding: 13px 23px;
margin-top: 3vh;
max-width: 10vw;
max-height: 8vh;
outline:none;
font-weight: ${Fonts.bold};
font-family: ${Fonts.family};
font-size: ${Fonts.small};
cursor: pointer;
mix-blend-mode: multiply;
:hover{
  background-color: rgb(247, 247, 247);
}

@keyframes press {
  0% {
    transform: scale(1.0, 1.0);
  }

  50% {
    transform: scale(0.85, 0.85);
  }

  100% {
    transform: scale(0.87, 0.87);
  }
}

&.clicked {
  animation-name: press;
  animation-duration: ${Animation.clickDuration}ms;
  animation-fill-mode: both;
  animation-timing-function: linear;
}
`;

class ShowAll extends React.Component {
  constructor({ numReviews, onClick }) {
    super();
    this.state = {
      numReviews,
      className: null,
    };
    this.onClick = onClick;
    this.click = this.click.bind(this);
  }

  click(e) {
    this.setState({
      className: 'clicked',
    }, () => {
      this.onClick(e);
    });
  }

  render() {
    const { className, numReviews } = this.state;

    return (
      <FlexColumn>
        <Container>
          <Button onClick={this.click} className={className}>{`Show all ${numReviews} reviews`}</Button>
        </Container>
      </FlexColumn>
    );
  }
}

const StyledShowAll = styled(ShowAll)`
`;

export default StyledShowAll;
