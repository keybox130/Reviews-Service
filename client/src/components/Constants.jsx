import styled from 'styled-components';

const margins = {
  width: `5vw`,
  barWidth: `150`,
  barHeight: `5px`
}

const FlexRow = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 2vh;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 30px;
`;

const Container = styled.div`
display: inline-block;
margin: 0vh ${margins.width};
max-width: 35vw;
`;


export {FlexRow, FlexColumn, Container, margins};