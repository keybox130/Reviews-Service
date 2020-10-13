import React from 'react';
import styled from 'styled-components';
import Highlighter from "react-highlight-words";

import {
  Text, Fonts,
} from './Constants.jsx';

const ReadMore = styled.a`
font-family: ${Fonts.family};
font-weight: ${Fonts.bold};
font-size: ${Fonts.medium};
text-decoration: underline;
display: inline;
cursor: pointer;
:active {
  color: rgb(113, 113, 113);
}
`;

const Wrapper = styled.div`
font-family: ${Fonts.family};
font-weight: ${Fonts.normal};
font-size: ${Fonts.medium};
`;

const ReviewText = ({ text, onClick, expanded, searchTerm }) => {
  return (
    <Wrapper>
      <Highlighter
        searchWords={[searchTerm]}
        autoEscape
        textToHighlight={text}
      />
      {expanded
        ? null
        : <ReadMore onClick={onClick}>read more...</ReadMore>}
    </Wrapper>
  );
};

const StyledReviewText = styled(ReviewText)`
`;

export default StyledReviewText;
