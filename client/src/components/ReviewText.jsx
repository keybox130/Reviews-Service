import React from 'react';
import styled from 'styled-components';
import fonts from './Fonts.js';

const Text = styled.p`
display: inline;
font-family: ${fonts.family};
font-weight: ${fonts.normal};
font-size: calc(14px + 1vw);
`;

const ReadMore = styled.a`
font-family: ${fonts.family}
font-weight: ${fonts.bold};
font-size: calc(14px + 1vw);
text-decoration: underline;
display: inline;
cursor: pointer;
&:active {
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
}

const StyledReviewText = styled(ReviewText)`
`;

export default StyledReviewText;