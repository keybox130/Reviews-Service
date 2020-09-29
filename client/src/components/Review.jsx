import React from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 3vw;
`;

const ProfileImage = styled.img`
max-height: 30vh;
display: inline-block;
border-radius: 50%;
object-fit: contain;
align-self: center;
flex: 0 0 auto;
`;

const Name = styled.p`
display: inline-block;
font-family: 'Nunito', sans-serif;
font-weight: 600;
font-size: calc(18px + 1vw);
margin-top: 3vh;
margin-bottom: 1vh;
`;

const Date = styled.p`
display: inline;
font-family: 'Nunito', sans-serif;
font-weight: 200;
font-size: calc(12px + 1vw);
margin-bottom: 1vh;
margin-top: 1vh;
`;

const ReviewText = styled.p`
display: inline;
font-family: 'Nunito', sans-serif;
font-weight: 400;
font-size: calc(14px + 1vw);
`;

const Container = styled.div`
display: inline-block;
margin: 5vh 5vw;
`;

const ReadMore = styled.a`
font-family: 'Nunito', sans-serif;
font-weight: 600;
font-size: calc(14px + 1vw);
text-decoration: underline;
display: inline;
`;

// returns a component of AirBnB-style formatted text
const shortenText = (text, shouldShorten) => {

  const textCutoff = 200;
  const renderLink = text.length > textCutoff;

  if (renderLink && shouldShorten) {
    // embed a link into the shortened review text after the nearest word
    let nearestWord = text.indexOf(' ', textCutoff);
    return (
      <div>
        <ReviewText>
          {text.slice(0, nearestWord) + '... '}
        </ReviewText>
        <ReadMore onClick={expand}>read more</ReadMore>
      </div>
    );
  } else {
    // render the full review text
    return (
    <ReviewText>
      {text}
    </ReviewText>
    );
  }
}

const Review = ( {review} ) => {

  return (
    <Container>
      <FlexRow>
        <ProfileImage src={review.userIcon}></ProfileImage>
        <FlexColumn>
          <Name>{review.name}</Name>
          <Date>{review.date}</Date>
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        {shortenText(review.reviewText)}
      </FlexRow>
    </Container>
  );

}

const StyledReview = styled(Review)`
display: inline-block;
`;

export default StyledReview;