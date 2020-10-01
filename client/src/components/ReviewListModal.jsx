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

    this.numReviewsToShow = 6;

    this.state = {
      reviews: reviews,
      renderedReviews: reviews.slice(0, this.numReviewsToShow)
    }
    this.myRef = React.createRef();
    this.refList = [];
  }

  componentDidMount() {
    window.addEventListener('scroll', e => {
      this.checkScrollBar();
    });
  }

  // load more reviews if the scroll bar is at the bottom
  loadMoreReviews() {
    const end = this.state.renderedReviews.length;
    const nextReviews = this.state.reviews.slice(end, end + this.numReviewsToShow);
    const newRendered = [...this.state.renderedReviews, ...nextReviews];
    console.log('Loading more reviews...');
    console.log(newRendered);
    this.setState({
      renderedReviews: newRendered
    })
  }

  // check if scrollbar is at bottom
  checkScrollBar() {
    const query = 'div.' + this.refList[0].current.classList[0];
    const reviewElements = document.querySelectorAll(query);
    const lastReview = reviewElements[reviewElements.length - 1];
    var lastElementOffset = lastReview.offsetTop + lastReview.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    console.log(`Page offset: ${pageOffset}, lastElementOffset: ${lastElementOffset}`);
    if (pageOffset > lastElementOffset) {
      this.loadMoreReviews();
    }
  }

  // save DOM refs of reviews in list
  saveRef(ref) {
    this.refList.push(ref);
  }

  render() {
    return (
      <FlexColumn>
        {this.state.renderedReviews.map((review, i) => {
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