import React from 'react';
import styled from 'styled-components';
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

const ReviewText = ({ text, onClick, expanded }) => {
  return (
    <div>
      <Text>{text}</Text>
      {expanded
        ? null
        : <ReadMore onClick={onClick}>read more...</ReadMore>}
    </div>
  );
};

const StyledReviewText = styled(ReviewText)`
`;

export default StyledReviewText;
