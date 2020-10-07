import React from 'react';
import styled from 'styled-components';
import {Text, Fonts} from './Constants.jsx';

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

const ReviewText = ({text, onClick, expanded}) => {
  const link = expanded ? null : <ReadMore onClick={onClick}>read more...</ReadMore>;

  return (
    <div>
      <Text>{text}</Text>
      {link}
    </div>
  );
};

const StyledReviewText = styled(ReviewText)`
`;

export default StyledReviewText;
