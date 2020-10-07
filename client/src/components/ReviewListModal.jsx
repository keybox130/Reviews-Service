import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import StyledReview from './Review.jsx';
import StyledSearchBar from './SearchBar.jsx';
import {
  FlexRow, Animation,
} from './Constants.jsx';

const ScrollableFlexColumn = styled.div.attrs((props) => ({ className: props.className }))`
display: flex;
flex-direction: column;
height: 80vh;
margin-left: -10vw;
overflow-y: scroll;

::-webkit-scrollbar {
  width: 10px;
}

&.scroll {
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
}

::-webkit-scrollbar-thumb {
  background: #888;
  :hover {
    background: #555;
  }
}
`;

class ReviewListModal extends React.Component {
  constructor({ reviews }) {
    super();

    // the number of reviews to load at a time
    this.numReviewsToShow = 8;
    const initialReviews = reviews.slice(0, this.numReviewsToShow);

    this.state = {
      allReviews: reviews,
      filteredReviews: reviews, // reviews filtered by search term
      viewableReviews: initialReviews, // reviews which are actually rendered
    };

    // whether this is the modal's first time rendering list of reviews
    this.initialRender = true;
    this.scrollWindow = React.createRef();

    this.saveRef = this.saveRef.bind(this);
    this.search = this.search.bind(this);

    // list of review DOM refs
    this.refList = [];
  }

  componentDidMount() {
    this.scrollWindow.current.addEventListener('scroll', e => {
      this.checkScrollBar(e);
    });
  }

  // load more reviews if the scroll bar is at the bottom
  loadMoreReviews() {
    const { viewableReviews, filteredReviews } = this.state;
    const end = viewableReviews.length;
    const nextReviews = filteredReviews.slice(end, end + this.numReviewsToShow);
    const newRendered = [...viewableReviews, ...nextReviews];
    this.setState({
      viewableReviews: newRendered,
    });
  }

  // check if scrollbar is at bottom and load more reviews if it is
  checkScrollBar(e) {
    const lastReview = this.refList[this.refList.length - 1].current;
    const lastElementOffset = lastReview.offsetTop + lastReview.clientHeight;
    const scrollOffset = e.target.scrollTop + e.target.clientHeight + e.target.offsetTop;
    if (scrollOffset >= lastElementOffset) {
      this.loadMoreReviews();
    }
  }

  // save DOM refs of filtered reviews
  saveRef(ref) {
    this.refList.push(ref);
  }

  // filter the rendered reviews by the search term
  search(e) {
    // clear the ref list so already rendered reviews don't
    // clash with filtered ones within checkScrollBar
    this.refList.splice(0);
    const searchTerm = e.target.value.toLowerCase();
    let filtered = null;

    const { allReviews } = this.state;

    if (searchTerm) {
      filtered = _.filter(allReviews, (review) => {
        return review.reviewText.toLowerCase().includes(searchTerm)
        || review.name.toLowerCase().includes(searchTerm)
        || review.month.toLowerCase().includes(searchTerm)
        || review.year.toLowerCase().includes(searchTerm);
      });
    } else {
      // show all rendered reviews
      filtered = allReviews;
    }
    this.setState({
      filteredReviews: filtered,
      viewableReviews: null,
    }, () => {
      // this is a workaround to make sure the state updates with viewable reviews
      this.setState({
        viewableReviews: filtered.slice(0, this.numReviewsToShow),
      });
    });
  }

  render() {
    const { viewableReviews } = this.state;
    const areViewableReviews = viewableReviews && viewableReviews.length;
    // React review components generated here to keep return statement a bit cleaner
    let reviewComponents = null;
    if (areViewableReviews) {
      reviewComponents = _.map(viewableReviews, (review, i) => {
        // animate each review successively after the dim and modal slide animations
        let delay = Number(Animation.reviewSlideDelay * (i)) + Number(Animation.modalSlideDuration)
         + Number(Animation.dimDuration);
        delay = delay.toString();
        return (
          <StyledReview
            text={review.reviewText}
            name={review.name}
            month={review.month}
            year={review.year}
            userIcon={review.userIcon}
            key={(i)}
            showAnimation={this.initialRender}
            delay={delay}
            callback={this.saveRef}
          />
        );
      }, this);
      // only show review transition effect once on modal
      if (this.initialRender) {
        this.initialRender = false;
      }
    } else {
      // empty placeholder to maintain modal width
      reviewComponents = [<StyledReview text="" name="" date="" userIcon="" key={-1} />];
    }
    return (
      <>
        <FlexRow>
          <StyledSearchBar callback={this.search} />
        </FlexRow>
        <FlexRow>
          {/* only show the scroll bar track if there are viewable reviews */}
          <ScrollableFlexColumn className={areViewableReviews ? 'scroll' : null} ref={this.scrollWindow}>
            {reviewComponents}
          </ScrollableFlexColumn>
        </FlexRow>
      </>
    );
  }
}

const StyledReviewListModal = styled(ReviewListModal)`
`;

export default StyledReviewListModal;
