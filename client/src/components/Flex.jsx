import styled from 'styled-components';

const margins = {
  width: `5vw`,
  left: `30px`,
}

const FlexRow = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 2vh;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: ${margins.left};
`;


export {FlexRow, FlexColumn, margins};