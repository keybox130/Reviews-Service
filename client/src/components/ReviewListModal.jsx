import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const FlexRow = styled.div`
display: flex;
flex-direction: row;
max-width: 2vw;
`;

const FlexColumn = styled.div`
display: flex;
flex-direction: column;
margin-left: 3vw;
overflow-y: scroll;
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  margin-top: 5vh;
  margin-bottom: 5vh;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

class ReviewListModal extends React.Component {

  constructor({reviews}) {
    super();
    this.state = {
      reviews: reviews,
      renderedReviews: reviews.slice(0,6)
    }
    this.refList = [];
  }

  componentDidMount() {

  }

  setupScrollBar() {
    const lastLi = document.querySelectorAll("ul.container > li:last-child");
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
  }

  // save DOM refs of reviews in list
  saveRef(ref) {
    debugger;
    if (!this.refList) {
      this.refList = [];
    }
    console.log(ref);
    this.refList.push(ref);
  }

  render() {
    return (
      <FlexColumn>
        {this.state.reviews.map((review, i) => {
          return (
            <StyledReview review={review} key={(i)} callback={this.saveRef.bind(this)}/>
            );
          })}
      </FlexColumn>
    );
  }

}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;