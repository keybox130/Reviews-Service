import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
display: inline;
font-family: 'Nunito', sans-serif;
font-weight: 400;
font-size: calc(14px + 1vw);
`;

const ReadMore = styled.a`
font-family: 'Nunito', sans-serif;
font-weight: 600;
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