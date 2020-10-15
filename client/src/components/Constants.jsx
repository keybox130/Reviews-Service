import styled from 'styled-components';

const Margins = {
  barWidth: '122',
  modalBarWidth: '75',
  barHeight: '4px',
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
  reviewSlideDuration: '400',
  reviewSlideDelay: '100', // time in between each review slide
  starLoadDuration: '600',
  reviewDelay: { // delay before starting slide on modal enter/exit
    enter: '0',
    exit: '600',
  },
};

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

&.left {
  justify-content: flex-start;
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
`;

const Container = styled.div.attrs((props) => ({ className: props.className }))`
display: inline-block;
width: 560px;
&.header {
  height: 6vh;
  padding-bottom: 32px;
}
`;

const compareFunction = (a, b) => {
  if (Number(a.year) < Number(b.year)) {
    return 1;
  }
  if (Number(a.year > Number(b.year))) {
    return -1;
  }
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (months.indexOf(a.month) < months.indexOf(b.month)) {
    return 1;
  }
  if (months.indexOf(a.month) > months.indexOf(b.month)) {
    return -1;
  }
  // a must be equal to b
  return 0;
};

export {
  FlexRow, FlexColumn, Container, Text, Fonts, Animation, Margins, compareFunction,
};
