import styled from 'styled-components';

const Margins = {
  barWidth: '150',
  modalBarWidth: '75',
  barHeight: '3px',
  imageSize: '20px',
  modalImageSize: '30px',
};

// animation durations, in ms
// flow: click animation => dim animation => slide animation => rating bar/search bar animation
const Animation = {
  modalSlideDuration: '400',
  barDuration: '400',
  dimDuration: '400',
  clickDuration: '200',
  searchExpandDuration: '200',
  reviewSlideDuration: '300',
  reviewSlideDelay: '100',
  starLoadDuration: '600',
}

const Fonts = {
  family: "'Nunito', sans-serif",
  small: '15px',
  medium: '17px',
  large: '18px',
  header: '25px',
  largeHeader: '30px',
  thin: '200',
  normal: '400',
  bold: '600',
  veryBold: '700',
};

const FlexRow = styled.div.attrs((props) => ({ className: props.justify }))`
display: flex;
flex-direction: row;
margin-bottom: 1vh;

&.left {
  justify-content: flex-start;
  margin: 0 6vw;
}
`;

const Text = styled.p.attrs((props) => ({ className: props.className }))`
display: inline;
font-family: ${Fonts.family};
font-weight: ${Fonts.normal};
font-size: ${Fonts.medium};
margin: 0 0;

&.rating {
  font-size ${Fonts.small};
  font-weight: ${Fonts.bold};
  padding-left: 10px;
}
`;

const FlexColumn = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: column;
margin-left: 1vw;

&.modal {
  margin-left: -20px;
  margin-top: -50px;
}
`;

const Container = styled.div.attrs((props) => ({ className: props.className }))`
display: inline-block;
margin: 1vh 3vw;
width: 25vw;
&.header {
  height: 6vh;
  margin-top: 0vh;
}
`;

export {
  FlexRow, FlexColumn, Container, Text, Fonts, Animation, Margins,
};
