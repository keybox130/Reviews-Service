import styled from 'styled-components';

const margins = {
  barWidth: `150`,
  modalBarWidth: `75`,
  barHeight: `4px`,
  imageSize: `20px`,
  modalImageSize: `30px`,
  modalLeftMargin: `-10px`
}

const animation = {
  slideDuration: `400`, // in ms
  dimDuration: `400` // in ms
}

const Fonts = {
  family: `'Nunito', sans-serif`,
  small: `15px`,
  medium: `17px`,
  large: `18px`,
  header: `25px`,
  largeHeader: `30px`,
  thin: `200`,
  normal: `400`,
  bold: `600`,
  veryBold: `700`
}

const FlexRow = styled.div.attrs(props => {
  return {
    className: props.justify
  }
})`
display: flex;
flex-direction: row;
margin-bottom: 1vh;

&.center {
  justify-content: center;
}

&.left {
  justify-content: flex-start;
  margin: 0 5vw;
}

`;

const Text = styled.p.attrs(props => {
  return {
    className: props.className
  }
})`
display: inline;
font-family: ${Fonts.family};
font-weight: ${Fonts.normal};
font-size: ${Fonts.medium};
margin: 0 0;

&.rating {
  font-size ${Fonts.small};
  padding-left: 10px;
}
`;

const FlexColumn = styled.div.attrs(props => {
  return {
    className: props.className
  }
})`
display: flex;
flex-direction: column;
margin-left: 1vw;
&.modal {
  margin-left: -20px;
  margin-top: -50px;
}
`;

const Container = styled.div.attrs(props => {
  return {
    className: props.className
  }
})`
display: inline-block;
margin: 1vh 3vw;
width: 25vw;
&.header {
  margin-top: -3vh;
}
`;

export {FlexRow, FlexColumn, Container, Text, Fonts, animation, margins};