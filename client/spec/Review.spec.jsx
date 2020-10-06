import React from 'react';
import {mount, shallow} from 'enzyme';
import StyledReview from '../src/components/Review.jsx';
import testData from './TestData.js';

describe('<StyledReview />', () => {

  it('should render a single review', () => {
    const review = testData.reviews[0];
    const wrapper = mount(<StyledReview text={review.reviewText} name={review.name} date={review.date} userIcon={review.userIcon}/>); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });
});