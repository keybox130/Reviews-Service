import React from 'react';
import StyledReview from './Review.jsx';
import StyledSearchBar from './SearchBar.jsx';
import styled from 'styled-components';
import {FlexRow} from './Constants.jsx';
import _ from 'underscore';

const ScrollableFlexColumn = styled.div`
display: flex;
flex-direction: column;
overflow-y: scroll;
height: 80vh;
margin-left: -10vw;
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  margin-top: 5vh;
  margin-bottom: 5vh;
}

::-webkit-scrollbar-thumb {
  background: #888;
  :hover {
    background: #555;
  }
}
`;

class ReviewListModal extends React.Component {

  constructor({reviews}) {
    super();

    this.numReviewsToShow = 6;

    this.state = {
      reviews: reviews,
      renderedReviews: reviews.slice(0, this.numReviewsToShow),
      filteredReviews: reviews.slice(0, this.numReviewsToShow)
    }
    this.myRef = React.createRef();
    this.refList = [];
  }

  componentDidMount() {
    this.myRef.current.addEventListener('scroll', e => {
      this.checkScrollBar(e);
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
  checkScrollBar(e) {
    const lastReview = this.refList[this.refList.length-6].current;
    const lastElementOffset = lastReview.offsetTop + lastReview.clientHeight;
    const pageOffset = e.target.scrollTop;
    console.log(pageOffset, lastElementOffset)
    if (pageOffset >= lastElementOffset) {
      this.loadMoreReviews();
    }
  }

  // save DOM refs of reviews in list
  saveRef(ref) {
    this.refList.push(ref);
  }

  // filter the rendered reviews by the search term
  search(e) {
    const term = e.target.value;
    // let filtered = _.filter(this.state.renderedReviews, (review) => {
    //   return review.text.includes(term) || review.
    // })
  }

  render() {
    return (
      <>
        <FlexRow>
          <StyledSearchBar callback={this.search.bind(this)} />
        </FlexRow>
        <FlexRow>
          <ScrollableFlexColumn ref={this.myRef}>
            {this.state.renderedReviews.map((review, i) => {
              return (
                <StyledReview text={review.reviewText} name={review.name} date={review.date} userIcon={review.userIcon} key={(i)} callback={this.saveRef.bind(this)}/>
                );
            })}
          </ScrollableFlexColumn>
        </FlexRow>
      </>
    );
  }

}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;