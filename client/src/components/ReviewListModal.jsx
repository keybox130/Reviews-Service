import React from 'react';
import styled from 'styled-components';
import StyledReview from './Review.jsx';
import StyledSearchBar from './SearchBar.jsx';
import { Animation } from './Constants.jsx';
import _ from 'underscore';

const ScrollableFlexColumn = styled.div.attrs((props) => ({ className: props.className }))`
  display: flex;
  flex-direction: column;
  height: 77vh;
  min-width: 600px;
  margin-top: 0vh;
  margin-left: -136px;
  margin-right: 3vw;
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
    border-radius: 10px;
    background: #888;
    :hover {
      background: #555;
    }
  }
`;

const FlexRow = styled.div.attrs((props) => ({ className: props.justify }))`
  display: flex;
  flex-direction: row;
  margin-bottom: 2vh;
`;

class ReviewListModal extends React.Component {
  constructor({ reviews }) {
    super();

    // the number of reviews to load at a time
    this.numReviewsToShow = 5;
    const initialReviews = reviews.slice(0, this.numReviewsToShow);

    this.state = {
      allReviews: reviews,
      filteredReviews: reviews, // reviews filtered by search term
      viewableReviews: initialReviews, // reviews which are actually rendered
      searchTerm: '',
    };

    // whether this is the modal's first time rendering list of reviews
    this.initialRender = true;
    this.scrollWindow = React.createRef();
    this.search = this.search.bind(this);
    this.scrollOffset = null;
    // list of review components
    this.reviewRefs = [];
  }

  componentDidMount() {
    this.scrollOffset =
      this.scrollWindow.current.clientHeight + this.scrollWindow.current.offsetTop;
    this.scrollWindow.current.addEventListener('scroll', (e) => {
      this.scrollOffset = e.target.scrollTop + e.target.clientHeight + e.target.offsetTop;
      this.checkReviewView();
      this.checkScrollBar();
    });
  }

  componentDidUpdate() {
    this.checkReviewView();
  }

  // set either an enter or exit transition on all reviews within view
  setTransition(transition) {
    let index = 0;
    // array of reviews to animate
    let animated;
    if (transition === 'enter') {
      // animate from top down
      animated = this.reviewRefs.slice(0, this.numReviewsToShow);
    } else if (transition === 'exit') {
      // animate from the bottom up
      animated = this.reviewRefs.slice(
        this.reviewRefs.length - this.numReviewsToShow * 2,
        this.reviewRefs.length
      );
      animated = _.filter(animated, (ref) => {
        return ref.current && this.reviewIsInView(ref);
      });
      animated.reverse();
    }
    _.each(animated, (ref) => {
      // only show transition on viewable reviews
      if (ref.current) {
        let delay = 0;
        if (transition === 'enter') {
          // animate each review successively after the dim and modal slide animations
          delay =
            Number(Animation.reviewSlideDelay * index) +
            Number(Animation.modalSlideDuration) +
            Number(Animation.dimDuration);
        } else if (transition === 'exit') {
          // start delay successions immediately
          delay = Number(Animation.reviewSlideDelay * index);
        }
        ref.current.setDelay(delay);
        ref.current.setTransition(transition);
        index += 1;
      }
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
  checkScrollBar() {
    if (this.reviewRefs.length > 0) {
      const lastReview = this.reviewRefs[this.reviewRefs.length - 1].current;
      const lastContainer = lastReview.containerRef.current;
      const lastElementOffset = lastContainer.offsetTop + lastContainer.clientHeight;
      if (this.scrollOffset >= lastElementOffset) {
        this.loadMoreReviews();
      }
    }
  }

  // check if individual review is in view (able to animate)
  reviewIsInView(reviewRef) {
    const container = reviewRef.current.containerRef.current;
    const containerOffset = container.offsetTop + container.clientHeight / 2;
    return containerOffset < this.scrollOffset;
  }

  // check if each review is within the scroll window
  checkReviewView() {
    _.each(this.reviewRefs, (reviewRef) => {
      if (reviewRef.current) {
        const currentTransition = reviewRef.current.getTransition();
        if (currentTransition !== 'exit' && this.reviewIsInView(reviewRef)) {
          // show enter animation successively on new viewable reviews
          reviewRef.current.setTransition('enter');
        } else if (currentTransition !== 'enter') {
          reviewRef.current.setTransition('invisible');
        }
      }
    });
  }

  // filter the rendered reviews by the search term
  search(e) {
    // clear the ref list so already rendered reviews don't clash with filtered ones within checkScrollBar
    this.reviewRefs.splice(0);
    const searchTerm = e.target.value.toLowerCase();
    this.setState({
      searchTerm,
    });
    let filtered = null;

    const { allReviews } = this.state;

    if (searchTerm) {
      filtered = _.filter(allReviews, (review) => {
        return (
          review.reviewText.toLowerCase().includes(searchTerm) ||
          review.name.toLowerCase().includes(searchTerm) ||
          review.month.toLowerCase().includes(searchTerm) ||
          review.year.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      // show all rendered reviews
      filtered = allReviews;
    }

    this.setState(
      {
        filteredReviews: filtered,
        viewableReviews: null,
      },
      () => {
        // this is a workaround to make sure the state updates with viewable reviews
        this.setState({
          viewableReviews: filtered.slice(0, this.numReviewsToShow),
        });
      }
    );
  }

  render() {
    const { viewableReviews, searchTerm } = this.state;
    const areViewableReviews = viewableReviews && viewableReviews.length >= 0;
    // React review components generated here to keep return statement a bit cleaner
    let reviewComponents = null;
    if (areViewableReviews) {
      this.reviewRefs.splice(0);
      reviewComponents = _.map(
        viewableReviews,
        (review, i) => {
          // show an enter animation on any newly created reviews on modal init
          const transition = this.initialRender ? 'enter' : null;
          const reviewRef = React.createRef();
          this.reviewRefs.push(reviewRef);
          return (
            <StyledReview
              ref={reviewRef}
              text={review.reviewText}
              name={review.name}
              month={review.month}
              year={review.year}
              userIcon={review.userIcon}
              key={i}
              transition={transition}
              isModal
              searchTerm={searchTerm}
            />
          );
        },
        this
      );
      if (this.initialRender) {
        this.initialRender = false;
      }
    } else {
      // empty placeholder to maintain modal width
      reviewComponents = [<StyledReview text="" name="" month="" year="" userIcon="" key={-1} />];
    }
    return (
      <>
        <FlexRow>
          <StyledSearchBar callback={this.search} />
        </FlexRow>
        <FlexRow>
          {/* only show the scroll bar track if there are viewable reviews */}
          <ScrollableFlexColumn
            className={areViewableReviews ? 'scroll' : null}
            ref={this.scrollWindow}
          >
            {reviewComponents}
          </ScrollableFlexColumn>
        </FlexRow>
      </>
    );
  }
}

const StyledReviewListModal = styled(ReviewListModal)``;

export default StyledReviewListModal;
