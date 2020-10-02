import React from 'react';
import StyledReview from './Review.jsx';
import styled from 'styled-components';

const ScrollableFlexColumn = styled.div`
display: flex;
flex-direction: column;
overflow-y: scroll;
height: 500px;
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
    this.myRef.current.addEventListener('scroll', e => {
      this.checkScrollBar();
    });
  }

  // load more reviews if the scroll bar is at the bottom
  loadMoreReviews() {
    const end = this.state.renderedReviews.length;
    const nextReviews = this.state.reviews.slice(end, end + this.numReviewsToShow);
    const newRendered = [...this.state.renderedReviews, ...nextReviews];
    this.setState({
      renderedReviews: newRendered
    })
  }

  // check if scrollbar is at bottom
  checkScrollBar() {
    if (this.myRef.current) {
      const lastReview = this.refList[this.refList.length-4].current;
      const lastElementOffset = lastReview.offsetTop + lastReview.clientHeight;
      const pageOffset = this.myRef.current.scrollTop;
      // console.log(`scrollHeight: ${pageOffset}, lastElementOffset: ${lastElementOffset}, # of elements: ${this.refList.length}`);
      if (pageOffset >= lastElementOffset) {
        this.loadMoreReviews();
      }
    }
  }

  // save DOM refs of reviews in list
  saveRef(ref) {
    this.refList.push(ref);
  }

  render() {
    return (
      <ScrollableFlexColumn ref={this.myRef}>
        {this.state.renderedReviews.map((review, i) => {
          return (
            <StyledReview review={review} key={(i)} callback={this.saveRef.bind(this)}/>
            );
        })}
      </ScrollableFlexColumn>
    );
  }

}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;